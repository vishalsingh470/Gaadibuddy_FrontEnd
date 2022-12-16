import Styled, { css } from "styled-components";

export const Userpopup = Styled.div`
height:fit-content;
width:clamp(5rem,10%,20rem);
z-index:1000;
background:white;
display:flex;
flex-direction:column;
justify-content:center;
align-content:center;
align-items:center;
border-radius:5px;
position:absolute;
top:105%;
left:88vw;
 
 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  button{
  color:black;
  background:none;
  font-size:70% !important;
  text-align:center;
  width:100%;
  cursor:pointer;
  font-weight:600;
  }
   p{
    color:black;
  background:none;
  font-size:80% !important;
  text-align:center;
  width:100%; 
  cursor:pointer;
  font-weight:600;
  
   }
`;

export const ServiceDropDown = Styled.div`
 
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
position:absolute;
min-height:60%;
min-width:10%;
z-index:10001;
top:105%;
left:59vw;
background:white;
border-radius:5px !important;
a{
  background:none;
  
  margin:1%;
  font-size:70% !important;
  height:2vh;
  font-weight:600;
  cursor:pointer;
  color:black;
}
li:hover{
  background-color:white;
   border-radius:5px !important;
}
 
hr{
   border: 0;
  clear: both;
  display: block;
  width: 100%;
  background-color:#FBFBFB;
  height:1px !important;
  margin: unset;
  
 
}
hr:last-child{
    border: 0;
  clear: both;
  display: block;
  width: 0%;
  background-color:#FBFBFB;
  height:0px !important;
  margin: unset;
  border-radius:5px !important;
}
`;

export const CarBox = Styled.div`
 
 @media (max-width: 768px) {
 margin-left:-10%;
    min-width: 80vw;
    min-height: 16vh;
      position:relative;
     margin:5%;
      
p{
    position:relative;
   font-size:1rem;
    color:black;
     left: 5%;
     top:8%;
     font-weight:normal;
     overflow:hidden;
     text-overflow: none;
   
     max-height:5vh;
     width: 50vw;
     text-wrap:ellipsis !important;
     white-space:wrap;
 
    min-width:60vw;
 }
      input{
  margin-left:0%;
     height:20px;
     width:20px;
    cursor:pointer;
 
    background-color:#024126;
 } 
 
 img{
  position:absolute;
  top:15%;
  left:88%;
  height:20px;
  width:20px;
 }
 
  }
 position:relative;
  min-width: 15rem;
  min-height: 15vh;
 margin-bottom:0.5rem;
 margin-right:2rem;
  
max-width:15rem;
 
  
    border:2px solid black;
     
text - align: left;
  
display:flex;
  height:fit-content;
  width:fit-content; 
flex-direction:row;
input{
  margin-left:20%;
     height:20px;
     width:20px;
    cursor:pointer;
 
    background-color:#024126;
 } 
 
 p{
    position:relative;
   font-size:1rem;
    color:black;
     left: 5%;
     top:8%;
     font-weight:normal;
     overflow:hidden;
     text-overflow: none;
     max-width:11rem;
     max-height:5vh;
     width: 12rem;
     text-wrap:ellipsis !important;
     white-space:wrap;
 }
  
 img{
  position:absolute;
  top:15%;
  left:88%;
  height:20px;
  width:20px;
 }
 
`;

export const ServiceCard = Styled.div`
height:40PX;
width:45%;
margin: 5px;
 
 
display:flex;
justify-content:center;
align-items:center;
background:${(props) => props.backGroundColor} ;
border-radius:5px;
text-align:center;
margin-bottom:1%;
 position:relative;
border: 2px solid grey;
  
a{
font-size:clamp(2vw,3.5vw,4vw);
color:${(props) => props.fontColor};
font-weight:bold;
text-decoration:none;

font-size:4vw;
 
 
text-align:center; 
 
border:none;
 
 }
 
`;
