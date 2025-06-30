import { StudentProject } from "../../models/uploadProjectSchema.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { Student } from "../../models/studentSchema.js";
import cloudinary from "cloudinary";
import { projectSchema } from "../../Validator/project-validator.js";
import { Teacher } from "../../models/teacherSchema.js";

export const addProject = async (req, res) => {
  const { _id: userId } = req.user;
  console.log(req.body);
  const { data, error } = projectSchema.safeParse(req.body);
  if (error) {
    return res.status(500).json({ message: error.errors[0]?.message });
  }
  const { projectName, projectDescription, teacherId, projectComponents } =
    data;

  let firePoint = 0;
  projectComponents.forEach((component) => {
    firePoint += Number(component?.componentValue);
  });
  const p = firePoint / projectComponents.length;
  firePoint = Math.round(p / 10);

  if (req.files.length == 0) {
    return res.status(500).json({ message: "Image is required" });
  }

  req?.files.map((file) => {
    if (file?.size > 7 * 1024 * 1024) {
      return res
        .status(400)
        .json({ message: "Image size should be less than 7MB" });
    }
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg"
    ) {
      return res
        .status(400)
        .json({ message: "Image format should be jpeg/png" });
    }
    return null;
  });

  const uploads = req.files.map(async (file) => {
    const image = await uploadOnCloudinary(file?.path, "project");
    if (!image) {
      throw new Error("Image uploading failed");
    }
    return {
      imageId: image.public_id,
      imageUrl: image.url,
    };
  });

  const teachId = await Teacher.findOne({ phoneNumber: teacherId });
  if (!teachId) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  Promise.all(uploads)
    .then(async (images) => {
      const imageArray = images;
      const projectData = await StudentProject.create({
        projectName,
        projectDescription,
        teacherId: teachId,
        projectComponents,
        firePoint,
        projectImage: imageArray,
        userId,
      });
      if (!projectData) {
        return res.status(500).json({ message: "Failed to create project" });
      }

      await Teacher.updateOne(
        { phoneNumber: teacherId },
        { $push: { projects: projectData._id } }
      );

      const student = await Student.findByIdAndUpdate(
        userId,
        {
          $push: { projects: projectData._id },
          $inc: { nonVerifiedProjects: 1 },
        },
        { new: true }
      );

      if (!student) {
        return res.status(500).json({ message: "Failed to update student" });
      }

      return res
        .status(201)
        .json({ data: projectData, message: "Uploaded Successfully" });
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .json({ message: error.message || "Failed to create project" });
    });
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const pr = await StudentProject.findById(id);
    console.log(pr);

    const promises = pr?.projectImage.map((image) => {
      cloudinary.uploader.destroy(image.imageId).then((res) => {
        return res;
      });
    });

    try {
      await Promise.all(promises);
    } catch (error) {
      return res.status(400).json({
        message: `Failed to delete`,
      });
    }

    const project = await StudentProject.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const student = await Student.findOneAndUpdate(
      { _id: project.userId },
      { $pull: { projects: project._id }, $inc: { nonVerifiedProjects: -1 } },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    const teacher = await Teacher.findOneAndUpdate(
      { phoneNumber: project.teacherId },
      { $pull: { projects: project._id } },
      { new: true }
    );
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await StudentProject.findById(id)
      .populate("userId")
      .populate("teacherId");
    return res.status(200).json({ data: projects, message: "Success" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch your data" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await StudentProject.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({ data: projects, message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const changeProjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;
    const perviousProjectState = await StudentProject.findById({ _id: id });

    const project = await StudentProject.findByIdAndUpdate(
      id,
      { isVerified },
      { new: true }
    )
      .populate("userId")
      .populate("teacherId");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const userId = project.userId;
    let updateFields = {};

    if (isVerified === "verified") {
      updateFields = {
        $inc: {
          verifiedProjects: 1,
          nonVerifiedProjects: -1,
          firePoints: project.firePoint,
        },
      };
    }

    if (
      perviousProjectState.isVerified === "verified" &&
      (isVerified === "unverified" || isVerified === "rejected")
    ) {
      updateFields = {
        $inc: {
          nonVerifiedProjects: 1,
          verifiedProjects: -1,
          firePoints: -project.firePoint,
        },
      };
      const user = await Student.findById(userId);
      if (user.firePoints - project.firePoint < 0) {
        updateFields.$set = { firePoints: 0 };
        delete updateFields.$inc.firePoints;
      }
      if (user.verifiedProjects <= 0) {
        updateFields.$set = { verifiedProjects: 0 };
        delete updateFields.$inc.verifiedProjects;
      }
    }

    const user = await Student.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ data: project, message: "Success" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 12 } = req.query;

    const projects = await StudentProject.find({ userId: _id })
      .skip(Math.max((page - 1) * limit, 0))
      .limit(limit);

    const totalCount = await StudentProject.countDocuments({ userId: id });

    return res.status(200).json({
      data: projects,
      message: "Success",
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
