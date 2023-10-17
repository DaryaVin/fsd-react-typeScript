import React, { useRef, useEffect } from 'react';
import "./contactsPage.scss";
import img1 from '../../img/aboutUs1.jpg';
import img2GisMapScrin from '../../img/2gisMapScrin.png';

import { FlexContainer } from '../flexContainer/flexContainer';
import { Field } from '../field/field';
import { useParams } from 'react-router-dom';

interface ContactsPageProps extends React.HTMLAttributes<HTMLDivElement> {

}
export const ContactsPage = ({ ...props }: ContactsPageProps) => {
  const params = useParams();
  const aboutUsInfo = useRef<null | HTMLHeadingElement>(null);
  const aboutUsContacts = useRef<null | HTMLHeadingElement>(null);

  const scrollToBlock = (block = "") => {
    if (block === "aboutUsInfo") {
      aboutUsInfo.current?.scrollIntoView({
        behavior: "smooth",
      })
    }
    if (block === "aboutUsContacts") {
      aboutUsContacts.current?.scrollIntoView({
        behavior: "smooth",
      })
    }
  };

  useEffect(() => {
    
    scrollToBlock(params.block);
  }, [params]);
  return (
    <FlexContainer {...props}
      className={'contactsPage' + (props.className ? " " + props.className : "")}
      flexDirection='colomn'
      rowGap={30}
      justifyContent='center'
      
    >
      <h1 key={"header"} ref={aboutUsInfo}>О нас</h1>
      <div key={"info"}
        className='contactsPage__contentInfo'
        
      >
        <div key={"img"}
          className='contactsPage__imgContener'
        >

          <img src={img1} alt='Красивое фото' className='contactsPage__img' />
        </div>
        <Field theme='card' className='contactsPage__textContent'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ab, nam error ullam veritatis optio labore id culpa neque ut quos eius vero? Culpa temporibus perspiciatis ea ullam corrupti asperiores repellendus obcaecati odio cumque molestias animi ipsa quae, itaque error maiores excepturi velit dolorem laboriosam ab eaque iusto cupiditate. Eaque ratione soluta voluptatibus commodi itaque ex! Odio, asperiores. Quam, magni reiciendis! Voluptas temporibus quod eos ad veniam?
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dolores facere vel! Odio quo exercitationem velit neque, pariatur quaerat libero accusamus eum laboriosam excepturi nemo possimus aperiam dolorem nobis ex repudiandae earum rem reiciendis quibusdam voluptatibus inventore dicta vel molestiae eveniet? Ullam cumque, ducimus similique ipsa voluptatem natus aliquid cupiditate.</p>
        </Field>
      </div>
      <FlexContainer key={"contacts"}
        className={"contactsPage__contacts"}
        rowGap={30}
        columnGap={30}
        
      >
        <Field key={"contact"} className='contactsPage__contactsInfo' theme='card' >
          <h2 ref={aboutUsContacts}>Наши контакты</h2>
          <FlexContainer key={"phone"}
            justifyContent='space-between'
          >
            <h3>Наш телефон:</h3>
            <div>0-000-000-00-00</div>
          </FlexContainer>
          <FlexContainer key={"address"}
            justifyContent='space-between'
          >
            <h3>Наш адрес:</h3>
            <div>г.Томск, ул.Неизвестная 0</div>
          </FlexContainer>
          <FlexContainer key={"email"}
            justifyContent='space-between'
          >
            <h3>Наш email:</h3>
            <div>toxinProect@mail.com</div>
          </FlexContainer>
        </Field>
        <img src={img2GisMapScrin} alt='Скрин карты' className='contactsPage__img' />
      </FlexContainer>
    </FlexContainer>
  )
}
