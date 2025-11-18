import DeliveryOrder from "../models/DeliveryOrder.js";

const DeliveryService = {
  crearPedido: async (customerId, items, status, assignedRiderId = null, estimatedTime = null, plataforma = "Propia") => {
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const newOrder = new DeliveryOrder({
      customerId,
      items,
      status,
      total,
      assignedRiderId,
      estimatedTime: estimatedTime ? new Date(Date.now() + estimatedTime * 60000) : null,
      plataforma
    });

    const savedOrder = await newOrder.save();
    console.log("Pedido guardado en Mongo:", savedOrder._id);
    return savedOrder;
  },

  listarPedidos: async () => {
    return await DeliveryOrder.find()
      .populate("customerId")
      .populate("items.menuItem")
      .populate("assignedRiderId");
  },

  despacharPedido: async (id) => {
    const pedido = await DeliveryOrder.findById(id);
    if (!pedido) throw new Error("Pedido no encontrado");
    pedido.status = "dispatched";
    await pedido.save();
    return pedido;
  },

  eliminarPedido: async (id) => {
    await DeliveryOrder.findByIdAndDelete(id);
    return true;
  }
};

export default DeliveryService;