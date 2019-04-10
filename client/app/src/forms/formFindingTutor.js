import React from 'react';
import useForm from 'react-hook-form';

export default function FormForFindingTutor() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      ต้องการเรียนวิชา:
      <select name="Courses" ref={register({ required: true })}>
        <option value="คณิตศาสตร์">คณิตศาสตร์</option>
        <option value="ภาษาอังกฤษ">ภาษาอังกฤษ</option>
        <option value="ภาษาไทย">ภาษาไทย</option>
        <option value="ฟิสิกส์">ฟิสิกส์</option>
        <option value="เคมี">เคมี</option>
        <option value="ชีววิทยา">ชีววิทยา</option>
      </select>
      <br />เลือกระดับชั้น:
      <select name="Levels" ref={register({ required: true })}>
        <option value="ประถม">ประถม</option>
        <option value="มัธยมต้น">มัธยมต้น</option>
        <option value="มัธยมปลาย">มัธยมปลาย</option>
      </select>
      <br />เวลาที่เริ่มเรียน:
      <input type="time" name="StartTime" ref={register({ required: true })} />
      <br />เวาลที่เลิกเรียน:
      <input type="time" name="EndTime" ref={register({ required: true })} />
      <br />สถานที่เรียน:
      <input type="text" name="Location" ref={register({ required: true })} />
      <br />ราคาต่อชั่วโมง:
      <input type="number" name="Price" ref={register({ required: true })} />
      <br />รายละเอียดเพิ่มเติม:
      <textarea name="Details" ref={register({ required: true })} />

      <br /><input type="submit" value="สร้างประกาศ"/>
    </form>
  );
}