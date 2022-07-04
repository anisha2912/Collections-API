const graphql = require('graphql');
const _ = require('lodash');
const Collection = require('../models/collection');
const {GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
        } = graphql;



const CollectionType = new GraphQLObjectType ({
    name:'Collection',
    fields: () => ({
        collectionname: { type: GraphQLString},
        products: {type: GraphQLInt},

    })
});

const RootQuery = new GraphQLObjectType ({
    name:"RootQueryType", 
    fields:  () => ({
        collection: {
            type: CollectionType, 
            args: {collectionname:{type: GraphQLString}},
            resolve(parent,args){
                //code to get data from db/ other source
                return Collection.findOne({collectionname: args.collectionname});
                //return _.find(collections, {collectionname: args.collectionname});
            }
        },  
        collections: {
            type:new GraphQLList(CollectionType),
            resolve(parent,args){
                return Collection.find({});
            }
        },
        
    })

});
//mutations will be changed and linked to the database, once the database is ready
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        //addCollection mutation will let you add the new joining customers information
        addCollection : {
            type:CollectionType,
            args: {
                collectionname: {type:new GraphQLNonNull(GraphQLString)},
                products: {type:new GraphQLNonNull(GraphQLInt)}

            },
            resolve(parent,args){
                let collection = new Collection({
                    collectionname : args.collectionname,
                    products : args.products
                });
                return collection.save();
         
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery ,
    mutation: Mutation
});