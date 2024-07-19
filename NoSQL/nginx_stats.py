from pymongo import MongoClient, errors

def get_nginx_stats():
    try:
        # Connect to the MongoDB server
        client = MongoClient('mongodb://localhost:27017/')
        db = client.logs
        collection = db.nginx

        # Count the total number of logs
        total_logs = collection.count_documents({})

        # Define the HTTP methods to check
        methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]

        # Initialize a dictionary to store the count for each method
        method_counts = {method: collection.count_documents({"method": method}) for method in methods}

        # Count the number of documents with method=GET and path=/status
        get_status_count = collection.count_documents({"method": "GET", "path": "/status"})

        # Print the results
        print(f"{total_logs} logs")
        print("Methods:")
        for method in methods:
            print(f"\tmethod {method}: {method_counts[method]}")
        print(f"{get_status_count} status check")

    except errors.ServerSelectionTimeoutError as err:
        print(f"Could not connect to MongoDB: {err}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    get_nginx_stats()
