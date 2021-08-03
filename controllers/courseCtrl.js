const Courses = require("../models/courseModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const courseCtrl = {
  createCourse: async (req, res) => {
    try {
      const {
        course_code,
        title,
        price,
        description,
        about,
        images,
        category,
        objective,
        requirements,
        videos,
      } = req.body;
      if (
        !course_code ||
        !title ||
        !price ||
        !description ||
        !about ||
        !category ||
        !objective ||
        !requirements ||
        !videos
      ) {
        return res.status(400).json({ msg: "Inavild Course Details" });
      }
      if (!images) {
        return res.status(400).json({ msg: "No Image is Selected" });
      }
      const course = await Courses.findOne({ course_code });
      if (course) {
        return res
          .status(400)
          .json({ msg: "This Course Code is Already Exists" });
      }
      const newCourse = new Courses({
        course_code,
        title,
        price,
        description,
        about,
        images,
        category,
        objective,
        requirements,
        videos,
      });
      await newCourse.save();
      res.json({ msg: "Created a Course" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getCourses: async (req, res) => {
    try {
      const features = new APIfeatures(Courses.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const courses = await features.query;

      res.json({
        status: "success",
        result: courses.length,
        courses: courses,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCourse: async (req, res) => {
    try {
      const {
        title,
        price,
        description,
        about,
        images,
        category,
        requirements,
        objective,
        videos,
      } = req.body;
      if (
        !title ||
        !price ||
        !description ||
        !category ||
        !about ||
        !requirements ||
        !objective ||
        !videos
      ) {
        return res.status(400).json({ msg: "Inavild Course Details" });
      }
      if (!images) {
        return res.status(400).json({ msg: "No Image is Selected" });
      }
      await Courses.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          price,
          description,
          about,
          images,
          category,
          requirements,
          objective,
          videos,
        }
      );
      res.json({ msg: "Course is Updated" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCourse: async (req, res) => {
    try {
      await Courses.findByIdAndDelete(req.params.id);
      res.json({ msg: "Course is Deleted" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = courseCtrl;
