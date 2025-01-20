const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'requerido']
    },
    email:{
        type: String,
        required: [true, 'requeirdo'],
        unique: true,
        index: true,
        validate: {
            validator: function(str){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
            },
            message: props =>  `${props.value} no es un mail valido`
        }
    },
    password: {
        type: String,
        required: [true, 'is required']
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    },

    cart: {
        type: Object,
        default: {
            total: 0,
            count: 0
        }
    },
    
    notifications: {
        type: Array,
        default: []
    },

    orders:[{type: mongoose.Schema.Types.ObjectId, ref:'Order'}]

}, {minimize:false});

UserSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({email});
    if(!user) throw new Error ('credenciales invalidas');
    const isSamePassword = bcrypt.compareSync(password, user.password);
    if(isSamePassword) return user;
    throw new Error ('credenciales invalidas');
    
};

UserSchema.methods.toJSON = function(){
    const user = this; 
    const UserObject = user.toObject ();
    delete UserObject.password;
    return UserObject;
}


UserSchema.pre('save', function (next){
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(error, salt){
        if(error) return next (error);

        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next (err);

            user.password = hash;
            next()
        })

    })

})


UserSchema.pre('remove', function(next){
    this.model('Order').remove({owner: this._id}, next);
})


const User = mongoose.model('User', UserSchema);
module.exports = User; 