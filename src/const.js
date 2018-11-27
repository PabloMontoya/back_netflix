module.exports = {

    SECRET_KEY:process.env.SECRET_KEY || "cAt6O0OA6+NKWHhYWI24yTu/8eE=",
    SECRET_KEY_STRIPE:process.env.SECRET_KEY || "sk_test_2jMcaAH6oYkMwH3qfjV0ANpG",
    SUBSCRIPTIONS_TYPES:{
        "GOLD":"plan_E1Ygujwdmb1uRf",
        "PREMIUM":"plan_E1YbA6qTZbbEgv"
    },
    MONGO_URI:'mongodb://prueba:prueba123@ds263493.mlab.com:63493/prueba123',
    TEST_MONGO_URI:"mongodb://prueba:prueba123@ds263493.mlab.com:63493/prueba123"


}
