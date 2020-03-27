var roles = {
    admin: {
        homepage: "/user/adminhome",
        actions: ["can_create_customer","can_view_customer_list"]
    },
    customer: {
        homepage: "/user/customerhome",
        actions: ["can_view_customer_profile"]
    }
};

module.exports = roles;