import Map "mo:core/Map";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";

actor {
  type ProductId = Nat;
  type CategoryId = Nat;
  type OrderId = Nat;
  type DeliveryAgentId = Nat;
  type AdVideoId = Nat;

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Nat;
    category : CategoryId;
    stock : Nat;
    image : Storage.ExternalBlob;
  };

  module Product {
    public func compare(a : Product, b : Product) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  public type Category = {
    id : CategoryId;
    name : Text;
  };

  public type OrderStatus = {
    #pending;
    #confirmed;
    #processing;
    #shipped;
    #outForDelivery;
    #delivered;
    #cancelled;
  };

  public type OrderItem = {
    productId : ProductId;
    quantity : Nat;
    price : Nat;
  };

  public type Order = {
    id : OrderId;
    customerName : Text;
    customerPhone : Text;
    address : Text;
    items : [OrderItem];
    totalAmount : Nat;
    paymentMethod : { #cod; #upi : { transactionId : Text } };
    status : OrderStatus;
    createdAt : Time.Time;
    deliveryAgent : ?DeliveryAgentId;
  };

  public type DeliveryAgent = {
    id : DeliveryAgentId;
    name : Text;
    phone : Text;
  };

  public type AdVideo = {
    id : AdVideoId;
    title : Text;
    video : Storage.ExternalBlob;
    active : Bool;
  };

  public type UserProfile = {
    name : Text;
    phone : Text;
    address : Text;
  };

  var productIdCounter = 0;
  var categoryIdCounter = 0;
  var orderIdCounter = 0;
  var deliveryAgentIdCounter = 0;
  var adVideoIdCounter = 0;

  let products = Map.empty<ProductId, Product>();
  let categories = Map.empty<CategoryId, Category>();
  let orders = Map.empty<OrderId, Order>();
  let deliveryAgents = Map.empty<DeliveryAgentId, DeliveryAgent>();
  let adVideos = Map.empty<AdVideoId, AdVideo>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profiles
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // Categories
  public shared func createCategory(name : Text) : async CategoryId {
    if (name == "") { Runtime.trap("Category name cannot be empty") };
    for (cat in categories.values()) {
      if (cat.name == name) { Runtime.trap("Category already exists") };
    };
    let id = categoryIdCounter;
    categoryIdCounter += 1;
    categories.add(id, { id; name });
    id;
  };

  public shared func updateCategory(id : CategoryId, name : Text) : async () {
    if (name == "") { Runtime.trap("Category name cannot be empty") };
    switch (categories.get(id)) {
      case (null) { Runtime.trap("Category not found") };
      case (?_) { categories.add(id, { id; name }) };
    };
  };

  public shared func deleteCategory(id : CategoryId) : async () {
    categories.remove(id);
  };

  public query func getCategories() : async [Category] {
    categories.values().toArray();
  };

  // Products
  public shared func createProduct(name : Text, description : Text, price : Nat, category : CategoryId, stock : Nat, image : Storage.ExternalBlob) : async ProductId {
    let id = productIdCounter;
    productIdCounter += 1;
    products.add(id, { id; name; description; price; category; stock; image });
    id;
  };

  public query func getProduct(id : ProductId) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?p) { p };
    };
  };

  public query func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public shared func updateProduct(id : ProductId, name : Text, description : Text, price : Nat, category : CategoryId, stock : Nat, image : Storage.ExternalBlob) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) { products.add(id, { id; name; description; price; category; stock; image }) };
    };
  };

  public shared func deleteProduct(id : ProductId) : async () {
    products.remove(id);
  };

  // Orders
  public shared func placeOrder(customerName : Text, customerPhone : Text, address : Text, items : [OrderItem], totalAmount : Nat, paymentMethod : { #cod; #upi : { transactionId : Text } }) : async OrderId {
    let id = orderIdCounter;
    orderIdCounter += 1;
    orders.add(id, {
      id; customerName; customerPhone; address; items;
      totalAmount; paymentMethod; status = #pending;
      createdAt = Time.now(); deliveryAgent = null;
    });
    id;
  };

  public query func getOrder(id : OrderId) : async Order {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?o) { o };
    };
  };

  public query func getOrdersByPhone(phone : Text) : async [Order] {
    if (phone == "") { return orders.values().toArray() };
    orders.values().toArray().filter(func(o) { o.customerPhone == phone });
  };

  public shared func updateOrderStatus(id : OrderId, status : OrderStatus) : async () {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?o) {
        orders.add(id, {
          id = o.id; customerName = o.customerName; customerPhone = o.customerPhone;
          address = o.address; items = o.items; totalAmount = o.totalAmount;
          paymentMethod = o.paymentMethod; status; createdAt = o.createdAt;
          deliveryAgent = o.deliveryAgent;
        });
      };
    };
  };

  // Delivery Agents
  public shared func createDeliveryAgent(name : Text, phone : Text) : async DeliveryAgentId {
    let id = deliveryAgentIdCounter;
    deliveryAgentIdCounter += 1;
    deliveryAgents.add(id, { id; name; phone });
    id;
  };

  public query func getDeliveryAgents() : async [DeliveryAgent] {
    deliveryAgents.values().toArray();
  };

  public shared func assignOrderToAgent(orderId : OrderId, agentId : DeliveryAgentId) : async () {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?o) {
        orders.add(orderId, {
          id = o.id; customerName = o.customerName; customerPhone = o.customerPhone;
          address = o.address; items = o.items; totalAmount = o.totalAmount;
          paymentMethod = o.paymentMethod; status = o.status; createdAt = o.createdAt;
          deliveryAgent = ?agentId;
        });
      };
    };
  };

  // Ad Videos
  public shared func addAdVideo(title : Text, video : Storage.ExternalBlob, active : Bool) : async AdVideoId {
    let id = adVideoIdCounter;
    adVideoIdCounter += 1;
    adVideos.add(id, { id; title; video; active });
    id;
  };

  public query func getAdVideos() : async [AdVideo] {
    adVideos.values().toArray();
  };

  public query func getActiveAdVideos() : async [AdVideo] {
    adVideos.values().toArray().filter(func(v) { v.active });
  };
};
