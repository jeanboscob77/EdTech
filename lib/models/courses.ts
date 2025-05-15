import { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  duration: { type: String, required: true },
  prerequisites: { type: String, required: false },
  instructor: { type: String, required: true },
  isEnrolled: {type: Boolean, default: false},
  userId: {type: Schema.Types.ObjectId, ref: "Users", default: undefined}
}, {
  timestamps: true,
});

const Course = models.Course || model('Course', CourseSchema);

export default Course;
