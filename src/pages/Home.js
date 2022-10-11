import { Container } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const {currentUser} = useContext(AuthContext)
  return (
  <Container sx={{textAlign:"center"}}>
    <h1>{currentUser?`Bienvenue ${currentUser.displayName}`:"Bienvenue sur le site"}</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur delectus perferendis, nobis consequatur ipsam eos nihil quidem. Dolor est sequi aut molestiae necessitatibus minima neque possimus ad error ab voluptatibus soluta autem voluptatem reprehenderit fugiat iure, ratione unde porro quaerat perferendis aperiam! Saepe aperiam nostrum voluptatem, blanditiis doloremque nam quam hic delectus eveniet error quod et libero. Asperiores, iste enim temporibus neque laudantium molestiae ut dolor voluptatum commodi, atque eum corporis quaerat rem eos fuga deleniti tenetur voluptas, odio dicta sunt impedit praesentium voluptate. Sit voluptates, natus officia quas, sapiente temporibus nesciunt quisquam earum iure sequi magni illum voluptatibus aut maiores nobis quod explicabo eius velit. Explicabo, facilis nobis! Nemo aliquid qui, magnam veniam itaque ea similique id excepturi amet rerum praesentium in modi aliquam a maxime impedit adipisci illum iste explicabo! Voluptates veritatis, facilis doloribus suscipit, dolores ad unde quae recusandae, placeat adipisci vel. Animi, in ex? Praesentium, cumque veniam tempora corporis quibusdam possimus rem dolor, rerum sunt nam nemo unde labore tempore, eaque mollitia. Ipsum quod molestiae nihil accusamus unde porro consequatur architecto totam quae pariatur magnam minima velit, libero ducimus obcaecati reprehenderit cum sint aliquam? Possimus suscipit voluptatem amet tenetur quae rem dolorum debitis et. Veniam, dolore.</p>
  </Container>
  );
};

export default Home;
