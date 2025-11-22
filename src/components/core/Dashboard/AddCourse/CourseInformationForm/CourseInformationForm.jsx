import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ReqirementField from "./ReqirementField";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, []);


const onSubmit=async(data)=>{

}

  return (
    <div>
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8">
<div>
    <label htmlFor="courseTitle"> Course Title <sup>*</sup></label>
    <input  id="courseTitle" placeholder="Enter Course Title" 
    {...register("courseTitle"),{required:true}}
    className="w-full"
    />
    {
        errors.courseTitle &&(
            <span>Course Title is Required**</span>
        )
    }
</div>
<div>
    <label htmlFor="courseShortDesc">Course Short Descritpion <sup>*</sup></label>
    <textarea id='courseShortDesc'placeholder=" Enetr Description"
    {
        ...register("courseShortDesc",{required:true})
    }
    className='min-h-[140px] w-full'
    />
{
    errors.courseShortDesc && (<span>
        Course Description is Required**
    </span>)
}
</div>
<div className="relative">
    <label htmlFor="coursePrice">Course Price <sup>*</sup></label>
    <textarea id='coursePrice'placeholder=" Enter Course Price"
    {
        ...register("coursePrice",{
            required:true,
            valueAsNumber:true,
            
        })
    }
    className=' w-full'
    />
    <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-400"/>
{
    errors.coursePrice && (<span>
        Course Price is Required**
    </span>)
}
</div>
<div>
    <label htmlFor="courseCategory">Course Category <sup>*</sup></label>
    <select defaultValue="" id="courseCategory" {...register("courseCategory",{required:true})}>
        <option value="" disabled>Choose a Category</option>
        {
            !loading && courseCategories.map((category,index)=>(
                <option key={index} value={category?._id}>
                    {category?.name}
                    </option>
            ))
        }
    </select>
    {
    errors.courseCategory && (<span>
        Course Category is Required**
    </span>)
}
</div>

{/* // create your own component  */}
{/* <ChipInput label="Tags" name="courseTags"placeholder="Enter tags and press Enter" register={register} errors={errors} setValue={setValue} getValues={getValues}/> */}

{/* create a component for uploading and showing preview of media  */}


{/* Benefits of the course  */}
<div>
    <label htmlFor="courseBenefits">Benefits of the Course <sup>*</sup></label>
    <textarea id='courseBenefits'
    placeholder="Enter the Benefits of the course"
    {
        ...register('courseBenefits',{required:true})
    }
    className="min-h-[130px] w-full"
    />
    {
        errors.courseBenefits && (
            <span>
Benefits of the course are required 
            </span>

        )
    }
</div>

<ReqirementField name="courseRequirements" 
label="Requirements/Instructions"
register={register}
errors={errors}
setValue={setValue}
getValues={getValues}
/>

        </form>
    </div> 
  )
};

export default CourseInformationForm;
