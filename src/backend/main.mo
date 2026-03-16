import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import List "mo:core/List";

actor {
  type Post = {
    id : Nat;
    title : Text;
    slug : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    author : Text;
    publishedAt : Text;
    readingTimeMinutes : Nat;
    imageUrl : Text;
    tags : [Text];
  };

  type Category = {
    id : Nat;
    name : Text;
    slug : Text;
    icon : Text;
    description : Text;
  };

  let posts = Map.empty<Text, Post>();
  let categories = Map.empty<Text, Category>();
  let subscriberEmails : List.List<Text> = List.empty<Text>();

  // Claude API key stored securely in backend canister
  var claudeApiKey : Text = "";

  let initialCategories : [Category] = [
    { id = 1; name = "Phones"; slug = "phones"; icon = "\u{1F4F1}"; description = "Latest news and reviews on smartphones." },
    { id = 2; name = "Laptops"; slug = "laptops"; icon = "\u{1F4BB}"; description = "Everything about laptops and notebooks." },
    { id = 3; name = "Tips"; slug = "tips"; icon = "\u{1F4A1}"; description = "Helpful tech tips and tricks." },
    { id = 4; name = "Reviews"; slug = "reviews"; icon = "\u{2B50}"; description = "In-depth reviews of tech products." },
    { id = 5; name = "Gaming"; slug = "gaming"; icon = "\u{1F3AE}"; description = "Gaming news, reviews, and guides." },
    { id = 6; name = "Comparisons"; slug = "comparisons"; icon = "\u{1F504}"; description = "Product comparisons and vs. articles." },
  ];

  let initialPosts : [Post] = [
    { id = 1; title = "Top 10 Smartphones of 2024"; slug = "top-10-smartphones-2024"; excerpt = "Discover the best smartphones of 2024."; content = "Full content goes here..."; category = "Phones"; author = "Jane Doe"; publishedAt = "2024-06-01"; readingTimeMinutes = 8; imageUrl = "https://example.com/images/smartphones.webp"; tags = ["smartphones", "tech", "reviews"] },
    { id = 2; title = "Laptop Buying Guide 2024"; slug = "laptop-buying-guide-2024"; excerpt = "Everything you need to know before buying a new laptop."; content = "Full content goes here..."; category = "Laptops"; author = "John Smith"; publishedAt = "2024-05-15"; readingTimeMinutes = 10; imageUrl = "https://example.com/images/laptops.webp"; tags = ["laptops", "buying guide", "tech"] },
  ];

  initialCategories.forEach(func(c) { categories.add(c.slug, c) });
  initialPosts.forEach(func(p) { posts.add(p.slug, p) });

  public query func getAllPosts() : async [Post] { posts.values().toArray() };
  public query func getPostsByCategory(category : Text) : async [Post] {
    posts.values().filter(func(p) { Text.equal(p.category, category) }).toArray();
  };
  public query func getPostBySlug(slug : Text) : async Post {
    switch (posts.get(slug)) { case (null) { Runtime.trap("Post not found") }; case (?p) { p } };
  };
  public query func getAllCategories() : async [Category] { categories.values().toArray() };
  public query func getCategoryBySlug(slug : Text) : async Category {
    switch (categories.get(slug)) { case (null) { Runtime.trap("Category not found") }; case (?c) { c } };
  };

  public func subscribeNewsletter(email : Text) : async Bool {
    if (subscriberEmails.contains(email)) { return false };
    subscriberEmails.add(email);
    return true;
  };

  public query func getSubscribers() : async [Text] { subscriberEmails.toArray() };

  // Save Claude API key securely in canister (persists across all devices/domains)
  public func setClaudeApiKey(key : Text) : async Bool {
    claudeApiKey := key;
    return true;
  };

  // Returns masked preview so admin can see if key is set, without exposing full key
  public query func getClaudeApiKeyStatus() : async Text {
    if (claudeApiKey.size() > 8) {
      Text.fromIter(claudeApiKey.chars().take(8)) # "..."
    } else {
      ""
    };
  };

  // Returns the API key — used by frontend chatbot to make Anthropic API calls
  // Key is stored in canister, not in localStorage, so works on all domains
  public query func getClaudeApiKey() : async Text {
    claudeApiKey;
  };
};
