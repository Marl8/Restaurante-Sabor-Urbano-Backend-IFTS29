import MenuItem from'../models/MenuItem.js';
import Supply from '../models/Supply.js';

const findMenuItems = async() => {
    try {
        const menuItems = await MenuItem.find().populate('supplies');
    return menuItems;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findMenuItemById = async (id) => {
    try {
        const menuItem = await MenuItem.findById(id).populate('supplies');
        if (!menuItem) throw new Error ('Item no encontrado');
        return menuItem;
    } catch (error) {
        throw new Error(error.message);
    }    
};

const saveMenuItem = async({name, price, category, stock, supplies})=>{
    try {
        if (!name || !price || !category || !stock || !supplies || !Array.isArray(supplies)) {
            throw new Error('Datos incompletos. Se requieren: name, price, category, stock, supplies');
        }
        const found = await MenuItem.findOne({"name": name});
        if(found){
            throw new Error ('Ya existe un item con este nombre');
        }
        const {invalidSupplies, validSupplies} = await suppliesValidator(supplies, stock);
        if (invalidSupplies.length > 0) {
            throw new Error(`Algunos suministros no existen en la base de datos o no tienen stock suficiente: ${invalidSupplies.join(', ')}`);
        }
        const item = new MenuItem({name, price, category, stock, supplies: validSupplies});
        const saveItem = await item.save();
        for (const supplyId of validSupplies) {
            await Supply.findByIdAndUpdate(
                supplyId,
                { $addToSet: { menuItems: saveItem._id } }
            );
        }
        await updateStockSupplies(saveItem._id, saveItem.stock);
        return saveItem;
    } catch (error) {
        throw new Error(error.message);
    }
}


const updateMenuItem = async (id, {name, price, category, supplies})=>{
    try {
        if (!id || !name || !price || !category || !supplies || !Array.isArray(supplies)) {
            return {error:'Datos incompletos. Se requieren: id, name, price, category, supplies'};
        }
        const {invalidSupplies, validSupplies} = await suppliesValidatorUpdate(supplies);
        if (invalidSupplies.length > 0) {
            return {error:`Algunos suministros no existen en la base de datos: ${invalidSupplies.join(', ')}`};
        }
        const item = await MenuItem.findByIdAndUpdate(id, {name, price, category, supplies: validSupplies}, {
            new: true,
            runValidators: true,
        });
        if(!item){
            return {error:'Item no encontrado'};
        }
        return {menuItem: item, message: 'MenuItem modificado con éxito'};
    } catch (error) {
        throw new Error(error.message);
    }
}    


const updateStockSupplies = async (id, cant) => {
    try {
        // Reemplazamos los IDs de los supplies en el MenuItem por los documentos completos para poder actualizar los stocks.
        const itemData = await MenuItem.findById(id).populate('supplies');
        if (!itemData) {
            return {error:'Item no encontrado'};
        }
        if (itemData.supplies.length > 0 && cant > 0) {
            for (let supply of itemData.supplies) {
                if (supply.stock >= cant) {
                    supply.stock = supply.stock - cant;
                    await supply.save();
                }else{
                    throw new Error(`Stock insuficiente de insumos`);
                }
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


const updateStockItem = async (id, cant) => {
    
    if (typeof cant !== "number") {
        throw new Error("Cantidad inválida");
    }    

    try {
        const itemData = await MenuItem.findById(id).populate('supplies');
        if (!itemData) {
            return {error:'Item no encontrado'};
        }
        if (cant > 0) {
            for (let supply of itemData.supplies) {
                if (supply.stock < cant) {
                    throw new Error(`Insumos insuficientes: ${supply.name}`);
                }
            }
            await updateStockSupplies(itemData._id, cant);     
        }
        itemData.stock += cant;
        await itemData.save();
        return { item: itemData, message: 'Stock del menú actualizado con éxito'};
    } catch (error) {
        throw new Error(error.message);
    }
};


const deleteMenuItem = async (id)=>{
    try {
        const deleteMenuItem = await MenuItem.findByIdAndDelete(id);
        if(!deleteMenuItem){
            return null;
        }
        return true;
    } catch (error) {
        throw new Error(error.message);
    } 
};


async function suppliesValidator(supplies, cant){
    const validSupplies = [];
    const invalidSupplies = [];
    
    for (let supplyId of supplies) {
        const supply = await Supply.findById(supplyId.trim()); 
        
        if (supply && supply.stock >= cant) {
            validSupplies.push(supply._id);
        } else {
            invalidSupplies.push(supplyId);
        }
    }
    return {invalidSupplies, validSupplies}
}

async function suppliesValidatorUpdate(supplies){
    const validSupplies = [];
    const invalidSupplies = [];
    
    for (let supplyId of supplies) {
        const supply = await Supply.findById(supplyId.trim()); 
        
        if (supply) {
            validSupplies.push(supply._id);
        } else {
            invalidSupplies.push(supplyId);
        }
    }
    return {invalidSupplies, validSupplies}
}


const MenuItemService = {
    saveMenuItem,
    findMenuItems,
    findMenuItemById,
    updateMenuItem,
    updateStockItem,
    deleteMenuItem,
}

export default MenuItemService;