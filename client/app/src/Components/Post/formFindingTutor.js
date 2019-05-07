import React from 'react';
import useForm from 'react-hook-form';
import { createFindingTutorPost } from '../../Actions/postActions';
import { RegisterInputElement } from '../FormElements/RegisterInputElement'
import { ActiveButton } from '../Button/Button'
import styled from 'styled-components'


const PostWrapper = styled.div`
  width:50%;
  margin:auto;
`
export default function FormForFindingTutor() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const token = localStorage.getItem('token')
      createFindingTutorPost(data, token)
  

  };


  return (
    <PostWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterInputElement marginBottom={2}>
          <label>ต้องการเรียนวิชา:</label>
          <select name="subject" data-cy="postSubject" ref={register({ required: true })}>
            <option value="คณิตศาสตร์">คณิตศาสตร์</option>
            <option value="ภาษาอังกฤษ">ภาษาอังกฤษ</option>
            <option value="ภาษาไทย">ภาษาไทย</option>
            <option value="ฟิสิกส์">ฟิสิกส์</option>
            <option value="เคมี">เคมี</option>
            <option value="ชีววิทยา">ชีววิทยา</option>
          </select>
        </RegisterInputElement>

        <RegisterInputElement marginBottom={2}>
          <label>เลือกระดับชั้น:</label>
          <select name="level" data-cy="postLevel" ref={register({ required: true })}>
            <option value="ประถม">ประถม</option>
            <option value="มัธยมต้น">มัธยมต้น</option>
            <option value="มัธยมปลาย">มัธยมปลาย</option>
          </select>
        </RegisterInputElement>

        <RegisterInputElement marginBottom={2}>
          <label>เวลาที่เริ่มเรียน</label>
          <input type="time" name="startTime" data-cy="postStartTime" ref={register({ required: true })} />
        </RegisterInputElement>

        <RegisterInputElement marginBottom={2}>
          <label>เวาลที่เลิกเรียน</label>
          <input type="time" name="endTime" data-cy="postEndTime" ref={register({ required: true })} />
        </RegisterInputElement>

        <RegisterInputElement marginBottom={2}>
          <label>สถานที่เรียน</label>
          <input type="text" name="location" data-cy="postLocation" ref={register({ required: true })} />
        </RegisterInputElement>

        <RegisterInputElement marginBottom={2}>
          <label>ราคาต่อชั่วโมง</label>
          <input type="number" name="expectPrice" data-cy="postExpectPrice" ref={register({ required: true })} />
        </RegisterInputElement>

        <RegisterInputElement marginBottom={2}>
          <label>รายละเอียดเพิ่มเติม</label>
          <textarea name="detail" data-cy="postDetail" ref={register({ required: true })} />
        </RegisterInputElement>


        <RegisterInputElement>
          <ActiveButton width={40} type="submit" data-cy="postSubmit_btn">สร้างประกาศ</ActiveButton>
        </RegisterInputElement>
      </form>
    </PostWrapper>
  );
}