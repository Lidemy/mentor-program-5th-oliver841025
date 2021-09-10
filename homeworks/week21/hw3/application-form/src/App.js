import React from "react";
import styled from "styled-components";

import FormItem from "./components/FormItem";
import FooterItem from "./components/FooterItem";
import "./utils";

const Main = styled.div``;

function App() {
  return (
    <Main>
      <FormItem />
      <FooterItem />
    </Main>
  );
}

export default App;
