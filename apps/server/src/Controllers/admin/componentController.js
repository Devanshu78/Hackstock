import { Component } from "../../models/componentSchema.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { componentSchema } from "../../Validator/component-validator.js";

const addComponent = async (req, res) => {
  try {
    const { data, error } = componentSchema.safeParse({
      ...req.body,
      componentAvailability: Number(req.body.componentAvailability),
      componentValue: Number(req.body.componentValue),
    });
    if (error) {
      console.log(error.errors[0]?.message);
      return res.status(500).json({ message: error.errors[0]?.message });
    }

    const { componentName, componentAvailability, componentValue } = data;
    const componentImageLocalPath = req.files?.componentImage[0]?.path;

    if (!componentImageLocalPath) {
      return res.status(500).json({ message: "Image is required" });
    }

    const image = await uploadOnCloudinary(
      componentImageLocalPath,
      "components"
    );
    if (!image) {
      return res
        .status(500)
        .json({ message: "Something went wrong while uploading image" });
    }

    const compDetails = await Component.create({
      componentName,
      componentAvailability,
      componentValue,
      componentImage: image.url,
      imageId: image.public_id,
    });

    const componentDetails = await Component.findById(compDetails._id);
    if (!componentDetails) {
      console.log(componentDetails);
      cloudinary.uploader.destroy(image.public_id);
      return res
        .status(500)
        .json({ message: "Something went wrong while adding component" });
    }

    return res
      .status(201)
      .json({ data: componentDetails, message: "Added Successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while adding component",
      error_message: error.message,
    });
  }
};

const getComponent = async (req, res) => {
  try {
    const components = await Component.find({}).sort({
      componentName: 1,
      _id: 1,
    });
    return res.status(200).json({ data: components, message: "Success" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while getting components",
      error_message: error.message,
    });
  }
};

const deleteComponent = async (req, res) => {
  const { id } = req.params;
  const { imageId } = req.query;
  try {
    const component = await Component.findById(id);
    if (!component) {
      return res.status(404).json({ message: "Component not found" });
    }
    const img = await cloudinary.uploader.destroy(imageId);
    if (!img) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    await Component.findByIdAndDelete(id);
    return res.status(200).json({ message: "Component deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//NOTE remove this function if not neccessary
const deleteAllComponents = async (req, res) => {
  try {
    await cloudinary.api.delete_resources_by_prefix(
      "vidyut_bhandar/components"
    );
    await Component.deleteMany({});
    return res
      .status(200)
      .json({ message: "All components deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateComponent = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = componentSchema.safeParse({
      ...req.body,
      componentAvailability: Number(req.body.componentAvailability),
      componentValue: Number(req.body.componentValue),
    });
    if (error) {
      console.log(error.errors[0]?.message);
      return res.status(500).json({ message: error.errors[0]?.message });
    }
    const { componentName, componentAvailability, componentValue } = data;
    const compo = await Component.findByIdAndUpdate(
      id,
      {
        componentName,
        componentAvailability,
        componentValue,
      },
      { new: true }
    );
    if (!compo) {
      return res.status(404).json({ message: "Component not found" });
    }
    return res
      .status(200)
      .json({ message: "Component updated successfully", data: compo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export {
  addComponent,
  getComponent,
  deleteAllComponents,
  deleteComponent,
  updateComponent,
};
