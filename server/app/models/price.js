/**
 * Created by leejacky on 18/7/18.
 */

/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */

const InvividualPriceSchema = new Schema({
   suburb: { type : String},
   name: { type : String},
   price: { type : Number},
   state: { type : String},
   type: { type : String}
});

const RegionPriceSchema = new Schema({
  prices: [{ type: InvividualPriceSchema}],
  region: { type : String}
});

var PriceSchema = new Schema({
  regions: [{ type: RegionPriceSchema}],
  updated: { type : Number}
});



module.exports = mongoose.model('Price', PriceSchema);
