import React, { useState, useEffect } from "react";
import { Input, Button, List, Checkbox } from "antd";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 10px;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #1890ff;
  color: white;
  border-radius: 4px;
  height: 40px;
`;

const TaskList = styled(List)`
  margin-top: 20px;
`;

const TaskItem = styled(List.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 16px;
  font-size: 16px;
`;

const TaskText = styled.span`
  ${({ completed }) => completed && `
    text-decoration: line-through;
    color: #aaa;
  `}
`;

const DeleteButton = styled(Button)`
  color: #ff4d4f;
  cursor: pointer;
`;

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Container>
      <Title>To-Do List</Title>
      <StyledInput
        placeholder="Add a new task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onPressEnter={addTask}
      />
      <StyledButton type="primary" onClick={addTask}>
        Add Task
      </StyledButton>
      <TaskList
        bordered
        dataSource={tasks}
        renderItem={(task, index) => (
          <TaskItem
            actions={[
              <DeleteButton type="link" onClick={() => deleteTask(index)}>
                Delete
              </DeleteButton>,
            ]}
          >
            <StyledCheckbox
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            >
              <TaskText completed={task.completed}>{task.text}</TaskText>
            </StyledCheckbox>
          </TaskItem>
        )}
      />
    </Container>
  );
};

export default TodoList;
