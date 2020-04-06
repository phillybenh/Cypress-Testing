import React from "react";
import UserCard from "./UserCard";
import styled from "styled-components";

//style
const CardContainer = styled.div`
  margin: 10px;
  width: 100%;
  padding: 4%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

//function
export default function UserGrid(props) {
    //  console.log("props", props);

  return (
    <CardContainer>
      {props.users.map((item, index) => {
        return <UserCard key={index} item={item} />;
      })}
      
    </CardContainer>
  );
}
