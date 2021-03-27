import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import Todo from './components/todos';
import { PlusOutlined, FormOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Button, Input, Typography, Modal, DatePicker, Tree, Timeline } from 'antd';
import moment from 'moment';
import {
  OPEN_ADD_PARENT_TODO,
  OPEN_ADD_SUBTASK_TODO,
  OPEN_EDIT_SUBTASK_TODO,
  actionAddTodo,
  actionModifyTodo
} from './reduxModules/todo';

const Title = styled(Typography.Title)({
  display: 'flex',
  alignItems: 'center',
  '& .ant-btn': {
    marginLeft: 10,
    height: 40
  }
});

export const DueDate = styled('div')({
  width: 144,
  position: 'absolute',
  left: 294
});

export const OverDue = styled('div')({
  width: 144,
  backgroundColor: '#dd4040',
  marginRight: 20,
  fontSize: 15,
  fontWeight: 700,
  color: '#fff',
  padding: 4,
  borderRadius: 3
});

export const Date = styled(DatePicker)({
  marginLeft: 20
});

export const InputText = styled(Input)({
  width: 300,
  margin: 20
});

export const ButtonTodo = styled(Button)(({ width=200 }) => ({
  width
}));

export const AddIcon = styled(PlusOutlined)({
  marginRight: `200px !important`
});

const Child = styled('p')(({ marginLeft=0 }) => ({
  marginLeft,
  marginBottom: 0
}));

const TodoApp = ({
  actionModifyTodo,
  isOpenParentAddTodo,
  actionAddTodo,
  todoList
}) => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedDue, setSelectedDue] = useState([]);
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');
  const [completed, setCompleted] = useState([]);
  const selected = completed.forEach(element => element.key);
  const handleChange= e => {
    setTitle(e.target.value);
  };

  const onSelect = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
    setSelectedDue(info.selectedNodes[0].dueDate);
  };

  const handleAddButton = () => {
    actionModifyTodo({ type: OPEN_ADD_SUBTASK_TODO, payload: true });
  };

  const handleEditTodo = () => {
    actionModifyTodo({ type: OPEN_EDIT_SUBTASK_TODO, payload: true });
  };

  const handleDateChange = e => {
    if (e) setDue(moment(e._d).format("D MMM"));
  };

  const handleAddClick = () => {
    actionModifyTodo({
      type: OPEN_ADD_PARENT_TODO,
      payload: false
    });
    actionAddTodo(todoList.concat([{
      title: title,
      key: title,
      children: [],
      dueDate: due,
      icon: [
      <FormOutlined onClick={handleEditTodo} />,
      <AddIcon onClick={handleAddButton} />,
      due && (due < moment().format("D MMM")) && <OverDue>Overdue</OverDue>,
      due && <DueDate>Due {moment(due).format("D MMM")}</DueDate>]
    }]));
    setTitle('');
    setSelectedKeys([]);
  };

  const handleOpenMainTodo = () => {
    setDue('');
    actionModifyTodo({
      type: OPEN_ADD_PARENT_TODO,
      payload: true
    });
  }

  return (
    <>
      <Title data-testid='todo-title'>
        Multi-level Todo List
        <ButtonTodo data-testid='add-todo-button' onClick={handleOpenMainTodo} width={50}>
          <PlusOutlined />
        </ButtonTodo>
      </Title>
      <Modal
        visible={isOpenParentAddTodo}
        title="Add Todo"
        onOk={handleAddClick}
        footer={
          <ButtonTodo data-testid='modal-add-todo-button' type='primary' onClick={handleAddClick}>Add todo</ButtonTodo>
        }
      >
        <InputText type='text' placeholder='Add todo' onChange={handleChange} value={title} />
        <Date format={'YYYY/MM/DD'} placeholder='Due Date' onChange={handleDateChange} />
      </Modal>
      <Todo 
        data-testid='tree-id'
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        selectedDue={selectedDue}
        setCompleted={setCompleted}
        completed={completed}
        />
      { completed.length ? (
      <>
        <Title>Completed</Title>
        <Timeline>
          {
            completed.map(data => (
              <Timeline.Item key={`${data.key}-parent`} color="green">{data.title}
                { data.children.length ? data.children.map(child => {
                  return (
                    <>
                      <Child key={`${child.key}-child`}><CheckCircleTwoTone twoToneColor="#52c41a" /> {child.title}</Child>
                      {child.children.length ? child.children.map(item => (
                        <Child marginLeft={15} key={`${item.key}-child`}><CheckCircleTwoTone twoToneColor="#52c41a" /> {item.title}</Child>
                      )) : ''}
                    </>
                  )
                }) : '' }
              </Timeline.Item>
            ))
          }
        </Timeline>
      </>
      ) : ''
      }
    </>
  );
};

export default connect(state => ({
  todoList: state.todoList,
  isOpenParentAddTodo: state.isOpenParentAddTodo
}), {
  actionModifyTodo,
  actionAddTodo
})(TodoApp);