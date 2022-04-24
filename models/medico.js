const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    /* Establecer una referencia entre 2 documentos */
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }

});

/* Modificar nombres y propiedades del objeto que se devuelve */

MedicoSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Medico', MedicoSchema);