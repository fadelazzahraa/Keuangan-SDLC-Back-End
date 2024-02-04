import requests
import time

# Set your endpoint URL
endpoint_url = "http://localhost:8080"

# Set the number of requests you want to send
num_requests = 1000

# Send multiple requests
for _ in range(num_requests):
    response = requests.get(endpoint_url)

    # Print the response status code and content
    print(f"Status Code: {response.status_code}, Content: {response.text}")

    # Add a delay between requests to simulate human-like interaction
