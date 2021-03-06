let knex = require("../database/connection");

class Cart{
    async addToCart(id,descricao,tamanho,quantidade,valor,usuario){
        try{
            return await knex("carrinho").insert({
                ID_produto:id,
                descricao:descricao,
                valorprod:valor,
                quantprod:quantidade,
                usuario:usuario
            });
        }
        catch (err){
            console.log(err);
        }
    }
    async findByProductID(id,usuario){
        try{
            let produto = await knex("carrinho").where({ID_produto:id,usuario:usuario});

            if(produto[0] === undefined){
                return {"status":false};
            }
            else{
                return {"status":true,"id":id,"id_carrinho":produto[0].ID_carrinho,"quantidade":produto[0].quantprod};
            }
        }
        catch (err){
            console.log(err);
            return {"status":false};
        }
    }
    async updateCartByProduct(idcarrinho,quantidade){
        try{
            await knex("carrinho").where({ID_carrinho:idcarrinho}).update({quantprod:quantidade});

            return {"status":true}
        }
        catch (err){
            console.log(err);
            return {"status":false}
        }
    }
    async findByUser(usuario){
        try{
            return await knex.select("*").where({usuario:usuario}).table("carrinho");
        }
        catch (e){
            console.log(e);
            return undefined;
        }
    }
    async deleteCart(usuario){
        try{
            let del = await knex("carrinho").where({usuario:usuario}).del();
            if(del===0){
                return {statusCode:200,message:"Carrinho já limpo!"}
            }

            return {statusCode:200,message:"Carrinho foi limpo com sucesso!"}
        }
        catch (err){
            return {statusCode:500,message:"Erro interno do sistema"}
        }
    }
    async removeCart(id){
        try{
            await knex("carrinho").
                where({ID_carrinho:id}).
                del();

            return {"statusCode":200,"message":"Produto removido do carrinho!"}
        }
        catch (err){
            return {"statusCode":500,"message":"Erro interno do sistema"}
        }
    }
}

module.exports = new Cart();
