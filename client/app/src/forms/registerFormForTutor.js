import React from 'react';
import useForm from 'react-hook-form';

export default function RegisterFormForTutor() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <br />Email:
        <input type="text" name="Email" ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
        <br />First name:
        <input type="text" name="First name" ref={register({ required: true, maxLength: 80 })} />
        <br />Last name:
        <input type="text" name="Last name" ref={register({ required: true, maxLength: 100 })} />
        <br /><b>ระดับการศึกษา</b>
        <br />มัธยมปลาย
        <input type="tel" name="High School" ref={register({ required: true, max: 11, min: 8 })} />
        <br />ปริญญาตรี
        <input type="text" name="Bachelor's Degree" ref={register({ required: true })} />
        <br />ปริญญาโท
        <input type="text" name="Master Degree" ref={register({ required: true })} />
        <br />ปริญญาเอก
        <input type="text" name="Doctoral Degree" ref={register({ required: true })} />
        <br />รหัสผ่าน
        <input type="text" name="Password" ref={register({ required: true })} />
        <br />ยืนยันรหัสผ่าน
        <input type="text" name="Repeat Password" ref={register({ required: true })} />

        <br /><input type="submit" value="สมัครสมาชิก"/>
    </form>
  );
}