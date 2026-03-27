import Int "mo:core/Int";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import List "mo:core/List";

actor {
  type Submission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Submission {
    public func compare(submission1 : Submission, submission2 : Submission) : Order.Order {
      Int.compare(submission1.timestamp, submission2.timestamp);
    };
  };

  let submissions = List.empty<Submission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : Submission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    submissions.add(submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.toArray().sort();
  };
};
