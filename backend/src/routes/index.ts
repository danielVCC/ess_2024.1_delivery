import { Express } from 'express';
import restaurantsRouter from './restaurant.routes';
import menuRouter from './menu.routes';
import clienteRouter from './login_cliente.routes';
import restauranteloginRouter from './login_restaurante.routes';
import categoryRouter from './category.routes';
import userRoutes from './user.routes'
import itemController from './item.routes';
import bodyParser from 'body-parser';

const setupRoutes = (app: Express): void => {
  app.use('/restaurant', restaurantsRouter);
  app.use('/restaurant/menu', menuRouter);
  app.use('/restaurant/menu/category', categoryRouter);
  app.use('/users', userRoutes);
  app.use('/login/client', clienteRouter);
  app.use('/login/restaurant', restauranteloginRouter);
  app.use(bodyParser.json());
  app.use("/restaurant/menu/item", itemController.router)
};


export default setupRoutes;