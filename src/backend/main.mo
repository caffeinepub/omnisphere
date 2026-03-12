import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
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

  // Newsletter subscriber emails
  let subscriberEmails : List.List<Text> = List.empty<Text>();

  // Initialize categories
  let initialCategories : [Category] = [
    {
      id = 1;
      name = "Phones";
      slug = "phones";
      icon = "📱";
      description = "Latest news and reviews on smartphones.";
    },
    {
      id = 2;
      name = "Laptops";
      slug = "laptops";
      icon = "💻";
      description = "Everything about laptops and notebooks.";
    },
    {
      id = 3;
      name = "Tips";
      slug = "tips";
      icon = "💡";
      description = "Helpful tech tips and tricks.";
    },
    {
      id = 4;
      name = "Reviews";
      slug = "reviews";
      icon = "⭐";
      description = "In-depth reviews of tech products.";
    },
    {
      id = 5;
      name = "Gaming";
      slug = "gaming";
      icon = "🎮";
      description = "Gaming news, reviews, and guides.";
    },
    {
      id = 6;
      name = "Comparisons";
      slug = "comparisons";
      icon = "🔄";
      description = "Product comparisons and vs. articles.";
    },
  ];

  // Initialize posts
  let initialPosts : [Post] = [
    {
      id = 1;
      title = "Top 10 Smartphones of 2024";
      slug = "top-10-smartphones-2024";
      excerpt = "Discover the best smartphones of 2024 with our comprehensive review.";
      content = "Full content goes here...";
      category = "Phones";
      author = "Jane Doe";
      publishedAt = "2024-06-01";
      readingTimeMinutes = 8;
      imageUrl = "https://example.com/images/smartphones.webp";
      tags = ["smartphones", "tech", "reviews"];
    },
    {
      id = 2;
      title = "Laptop Buying Guide 2024";
      slug = "laptop-buying-guide-2024";
      excerpt = "Everything you need to know before buying a new laptop.";
      content = "Full content goes here...";
      category = "Laptops";
      author = "John Smith";
      publishedAt = "2024-05-15";
      readingTimeMinutes = 10;
      imageUrl = "https://example.com/images/laptops.webp";
      tags = ["laptops", "buying guide", "tech"];
    },
    {
      id = 3;
      title = "How to Optimize Your Smartphone Battery";
      slug = "optimize-smartphone-battery";
      excerpt = "Increase your smartphone's battery life with these simple tips.";
      content = "Full content goes here...";
      category = "Tips";
      author = "Jane Doe";
      publishedAt = "2024-04-20";
      readingTimeMinutes = 5;
      imageUrl = "https://example.com/images/battery-tips.webp";
      tags = ["smartphones", "battery", "tips"];
    },
    {
      id = 4;
      title = "Best Gaming Laptops 2024";
      slug = "best-gaming-laptops-2024";
      excerpt = "Our top picks for gaming laptops in 2024.";
      content = "Full content goes here...";
      category = "Gaming";
      author = "John Smith";
      publishedAt = "2024-03-30";
      readingTimeMinutes = 7;
      imageUrl = "https://example.com/images/gaming-laptops.webp";
      tags = ["gaming", "laptops", "reviews"];
    },
    {
      id = 5;
      title = "iPhone vs Android: Which Should You Choose?";
      slug = "iphone-vs-android-comparison";
      excerpt = "A detailed comparison between iPhone and Android devices.";
      content = "Full content goes here...";
      category = "Comparisons";
      author = "Jane Doe";
      publishedAt = "2024-02-25";
      readingTimeMinutes = 6;
      imageUrl = "https://example.com/images/iphone-android.webp";
      tags = ["smartphones", "comparison", "tech"];
    },
    {
      id = 6;
      title = "Top Accessories for Your Smartphone";
      slug = "top-smartphone-accessories";
      excerpt = "Must-have accessories to enhance your smartphone experience.";
      content = "Full content goes here...";
      category = "Phones";
      author = "John Smith";
      publishedAt = "2024-01-10";
      readingTimeMinutes = 4;
      imageUrl = "https://example.com/images/accessories.webp";
      tags = ["smartphones", "accessories", "phones"];
    },
  ];

  // Initialize categories map
  initialCategories.forEach(
    func(category) {
      categories.add(category.slug, category);
    }
  );

  // Initialize posts map
  initialPosts.forEach(
    func(post) {
      posts.add(post.slug, post);
    }
  );

  public query ({ caller }) func getAllPosts() : async [Post] {
    posts.values().toArray();
  };

  public query ({ caller }) func getPostsByCategory(category : Text) : async [Post] {
    posts.values().filter(
      func(post) {
        Text.equal(post.category, category);
      }
    ).toArray();
  };

  public query ({ caller }) func getPostBySlug(slug : Text) : async Post {
    switch (posts.get(slug)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) { post };
    };
  };

  public query ({ caller }) func getAllCategories() : async [Category] {
    categories.values().toArray();
  };

  public query ({ caller }) func getCategoryBySlug(slug : Text) : async Category {
    switch (categories.get(slug)) {
      case (null) { Runtime.trap("Category not found") };
      case (?category) { category };
    };
  };

  // Subscribe to newsletter — stores email, returns false if already subscribed
  public func subscribeNewsletter(email : Text) : async Bool {
    let alreadyExists = subscriberEmails.contains(email);
    if (alreadyExists) {
      return false;
    };
    subscriberEmails.add(email);
    return true;
  };

  // Get all subscribers (admin use)
  public query func getSubscribers() : async [Text] {
    subscriberEmails.toArray();
  };
};
