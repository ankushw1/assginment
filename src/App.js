import React from 'react'
import TodoList from './components/TodoList'
import UserTable from './components/UserTable'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  flex-wrap: wrap; 

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
`

const ComponentWrapper = styled.div`
  width: 48%;
  min-width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const App = () => {
  return (
    <AppContainer>
      <ComponentWrapper>
        <TodoList />
      </ComponentWrapper>
      <ComponentWrapper>
        <UserTable />
      </ComponentWrapper>
    </AppContainer>
  )
}

export default App
