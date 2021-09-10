import React, { useState } from "react";

import {
  Body,
  Form,
  Wrapper,
  Title,
  TitleDesc,
  P,
  Div,
  InputTitle,
  Input,
  Alert,
  RadioItem,
  SubmitButton,
} from "../utils";

const FormItem = () => {
  const [name, setName] = useState({ content: "", hasError: false });
  const [email, setEmail] = useState({ content: "", hasError: false });
  const [phone, setPhone] = useState({ content: "", hasError: false });
  const [knowHow, setKnowHow] = useState({ content: "", hasError: false });
  const [type, setType] = useState({
    content: "",
    hasError: false,
  });
  const [suggestion, setSuggestion] = useState({
    content: "",
  });

  const onChangeType = (e) => {
    if (e.target.value === "ground") {
      setType({ content: "趴在地上滑手機找現成的", hasError: false });
    }
    if (e.target.value === "bed") {
      setType({ content: "躺在床上用想像力實作", hasError: false });
    }
  };

  const Radio = ({ onChangeType }) => {
    return (
      <div>
        <RadioItem>
          <label>
            <input
              type="radio"
              value="bed"
              name="type"
              onChange={onChangeType}
            />
            躺在床上用想像力實作
          </label>
        </RadioItem>

        <RadioItem>
          <label>
            <input
              type="radio"
              value="ground"
              name="type"
              onChange={onChangeType}
            />{" "}
            趴在地上滑手機找現成的
          </label>
        </RadioItem>
      </div>
    );
  };

  const handleNameInputChange = (e) => {
    setName({ content: e.target.value, hasError: false });
  };

  const handleEmailInputChange = (e) => {
    setEmail({ content: e.target.value, hasError: false });
  };

  const handlePhoneInputChange = (e) => {
    setPhone({ content: e.target.value, hasError: false });
  };

  const handleKnowHowInputChange = (e) => {
    setKnowHow({ content: e.target.value, hasError: false });
  };

  const handleSuggestionInputChange = (e) => {
    setSuggestion({ content: e.target.value, hasError: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.content) {
      setName({
        ...name,
        hasError: true,
      });
    }

    if (!email.content) {
      setEmail({
        ...email,
        hasError: true,
      });
    }

    if (!phone.content) {
      setPhone({
        ...phone,
        hasError: true,
      });
    }

    if (!type.content) {
      setType({
        ...type,
        hasError: true,
      });
    }

    if (!knowHow.content) {
      setKnowHow({
        ...knowHow,
        hasError: true,
      });
    }

    if (
      name.content &&
      email.content &&
      phone.content &&
      type.content &&
      knowHow.content
    ) {
      alert(`
        ${name.content}
        ${email.content}
        ${phone.content}
        ${type.content}
        ${knowHow.content}
        ${suggestion.content}
    `);
    }
  };

  return (
    <Body>
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <Title>新拖延運動報名表單</Title>
          <TitleDesc>
            <P>活動日期：2020/12/10 ~ 2020/12/11</P>
            <P>活動地點：台北市大安區新生南路二段1號</P>
            <Div>* 必填</Div>
          </TitleDesc>
          <Div>
            <InputTitle>
              暱稱
              {name.hasError && <Alert>* 請輸入完整資料</Alert>}
            </InputTitle>
            <Input
              placeholder="暱稱"
              type="text"
              onChange={handleNameInputChange}
            ></Input>
          </Div>
          <Div>
            <InputTitle>
              電子郵件
              {email.hasError && <Alert>* 請輸入完整資料</Alert>}
            </InputTitle>
            <Input
              placeholder="電子郵件"
              type="email"
              onChange={handleEmailInputChange}
            ></Input>
          </Div>
          <Div>
            <InputTitle>
              手機號碼
              {phone.hasError && <Alert>* 請輸入完整資料</Alert>}
            </InputTitle>
            <Input
              placeholder="手機號碼"
              onChange={handlePhoneInputChange}
            ></Input>
          </Div>
          <Div>
            <InputTitle>
              報名類型
              {type.hasError && <Alert>* 請輸入完整資料</Alert>}
              <Radio onChangeType={onChangeType}></Radio>
            </InputTitle>
          </Div>
          <Div>
            <InputTitle>
              怎麼知道這個活動的
              {knowHow.hasError && <Alert>* 請輸入完整資料</Alert>}
            </InputTitle>
            <Input
              placeholder="你的回答"
              onChange={handleKnowHowInputChange}
            ></Input>
          </Div>
          <Div>
            <InputTitle>其他建議</InputTitle>
            <Input
              placeholder="你的回答"
              onChange={handleSuggestionInputChange}
            ></Input>
          </Div>
          <SubmitButton type="submit">提交</SubmitButton>
        </Wrapper>
      </Form>
    </Body>
  );
};

export default FormItem;
