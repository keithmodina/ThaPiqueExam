import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tree, Modal } from 'antd';
import styled from '@emotion/styled';
import { FormOutlined } from '@ant-design/icons';
import { InputText, ButtonTodo, Date, DueDate, AddIcon, OverDue } from '../App';
import moment from 'moment';
import {
    OPEN_ADD_SUBTASK_TODO,
    OPEN_EDIT_SUBTASK_TODO,
    actionAddTodo,
    actionModifyTodo
} from '../reduxModules/todo';

const TodoTree = styled(Tree)({
  '& .ant-tree-iconEle': {
    position: 'absolute',
    right: -28,
    display: 'flex !important',
    alignItems: 'center'
  },
  '& .anticon': {
      margin: '0 6px'
  },
  '& .ant-tree-title': {
      width: 300
  }
});

const Todo = ({
  setSelectedKeys,
  onSelect,
  selectedKeys,
  actionModifyTodo,
  actionAddTodo,
  todoList,
  isOpenAddSubTask,
  isOpenEditSubTask,
  selectedDue,
  setCompleted,
  completed
}) => {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [autoExpandParent, setAutoExpandParent] = useState(false);
    const [title, setTitle] = useState('');
    const [editTitle, setEditTitle] = useState(selectedKeys[0]);
    const [list, setList] = useState(todoList);
    const [due, setDue] = useState('');
    const [editDue, setEditDue] = useState(selectedDue);

    const hanldeAddSubTask = () => {
      actionModifyTodo({ type: OPEN_ADD_SUBTASK_TODO, payload: true });
    };

    const hanldeEditSubTask = () => {
      actionModifyTodo({ type: OPEN_EDIT_SUBTASK_TODO, payload: true });
    };

    const handleDateChange = e => {
      if (e) setDue(moment(e._d).format("D MMM"));
    };
    
    const handleAddClick = () => {
      let newArray = [...todoList];
      let parentIndex = newArray.findIndex(element => element.key === selectedKeys[0]);

      if (parentIndex > -1) {
        newArray[parentIndex].children.push({
            title,
            key: title,
            dueDate: due,
            children: [],
            icon: [
              <FormOutlined onClick={hanldeEditSubTask} />,
              <AddIcon onClick={hanldeAddSubTask} />,
              due && (due < moment().format("D MMM")) && <OverDue>Overdue</OverDue>,
              due && <DueDate>Due {moment(due).format("D MMM")}</DueDate>] });
      } else {
        for (const key in newArray) {
            for(const i in newArray[key].children) {
              if (newArray[key].children.length > -1) {
                parentIndex = newArray[key].children.findIndex(element => element.key === selectedKeys[0]);
              }
            }
          if (parentIndex > -1 && newArray[key].children[parentIndex]) {
            newArray[key].children[parentIndex].children.push({
                title,
                key: title,
                dueDate: due,
                children: [],
                icon: [
                  <FormOutlined onClick={hanldeEditSubTask} style={{marginRight: 200}} />,
                  due && (due < moment().format("D MMM")) && <OverDue>Overdue</OverDue>,
                  due && <DueDate>Due {moment(due).format("D MMM")}</DueDate>] });
          }
        }
      }
      actionAddTodo(newArray);
      actionModifyTodo({ type: OPEN_ADD_SUBTASK_TODO, payload: false });
      setTitle('');
      setSelectedKeys([]);
    };

    const callAction = newArray => {
        actionAddTodo(newArray);
        actionModifyTodo({ type: OPEN_EDIT_SUBTASK_TODO, payload: false });
        setTitle('');
        setSelectedKeys([]);
    };

    const handleEditClick = () => {
        let newArray = [...todoList];
        let parentIndex = newArray.findIndex(element => element.key === selectedKeys[0]);
  
        if (parentIndex > -1) {
          newArray[parentIndex].title = editTitle;
          newArray[parentIndex].dueDate = editDue;
          callAction(newArray);
        } else {
          for (const key in newArray) {
              for(const i in newArray[key].children) {
                if (newArray[key].children.length > -1) {
                  parentIndex = newArray[key].children.findIndex(element => element.key === selectedKeys[0]);
                }
                if (parentIndex > -1 && newArray[key].children[parentIndex]) {
                    newArray[key].children[parentIndex].title = editTitle;
                    newArray[key].children[parentIndex].dueDate = editDue;
                    callAction(newArray);
                    return;
                }
                if (newArray[key].children[i].children.length) {
                    for(const e in newArray[key].children[i].children) {
                      parentIndex = newArray[key].children[i].children.findIndex(element =>  element.key === selectedKeys[0]);
                    }
                    newArray[key].children[i].children[parentIndex].title = editTitle;
                    callAction(newArray);
                    return;
                }
              }
          }
        }
    };

    const handleChange= e => {
      setTitle(e.target.value);
    };

    const handleEditChange= e => {
      setEditTitle(e.target.value);
    };

    const onExpand = (expandedKeysValue) => {
      setExpandedKeys(expandedKeysValue);
      setAutoExpandParent(true);
    };
  
    const onCheck = (checkedKeysValue, info) => {
      if(!info.halfCheckedKeys.length && info.checkedNodes.length && info.checked) {
        info.checkedNodes.forEach(element => {
            setCompleted(completed.concat(element));
        });
      }
      setCheckedKeys(checkedKeysValue);
    };

    useEffect(() => {
      setList(todoList);
    }, [todoList]);

    useEffect(() => {
      setEditTitle(selectedKeys[0]);
      setEditDue(selectedDue);
    }, [selectedKeys, selectedDue]);
    
    return (
      <>
        <TodoTree
            checkable
            showIcon={true}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={list}
        />
        <Modal
          visible={isOpenAddSubTask}
          title="Add Sub-task"
          onOk={handleAddClick}
          onCancel={() => actionModifyTodo({ type: OPEN_ADD_SUBTASK_TODO, payload: false })}
          footer={
            <ButtonTodo type='primary' onClick={handleAddClick}>Add Sub-task</ButtonTodo>
          }
        >
          <InputText type='text' placeholder='Add Sub task' onChange={handleChange} value={title} />
          <Date format={'YYYY/MM/DD'} placeholder='Due Date' onChange={handleDateChange} />
        </Modal>
        <Modal
          visible={isOpenEditSubTask}
          title="Edit Sub-task"
          onOk={handleEditClick}
          onCancel={() => actionModifyTodo({ type: OPEN_EDIT_SUBTASK_TODO, payload: false })}
          footer={
            <ButtonTodo type='primary' onClick={handleEditClick}>Edit Sub-task</ButtonTodo>
          }
        >
          <InputText type='text' placeholder='Edit Sub task' onChange={handleEditChange} value={editTitle} />
          { editDue && <Date defaultValue={moment(editDue)} format={'YYYY/MM/DD'} placeholder='Due Date' onChange={handleDateChange} /> }
        </Modal>
      </>
    );
};

Todo.propTypes = {
  setSelectedKeys: PropTypes.func,
  onSelect: PropTypes.func,
  selectedKeys: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  ),
  actionModifyTodo: PropTypes.func,
  actionAddTodo: PropTypes.func,
  todoList: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  ),
  isOpenAddSubTask: PropTypes.bool,
  isOpenEditSubTask: PropTypes.bool,
  selectedDue: PropTypes.string,
  setCompleted: PropTypes.func,
}

export default connect(state => ({
  todoList: state.todoList,
  isOpenAddSubTask: state.isOpenAddSubTask,
  isOpenEditSubTask: state.isOpenEditSubTask
}), {
  actionModifyTodo,
  actionAddTodo
})(Todo);