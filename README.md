# Weak Password Detection using Bloom-Filters
We only use bloom-filters & list of weak passwords & we check against it. 
We don't check other conditions like (length of password, special characters etc.)
We here focus on just the implementation of Bloom-filters, and showing the demo, how it can be used to detect weak passwords or it can be used to check whether some item exists in list or not.

### How We can test it?
#### Online Version
- Frontend [hosted at surge.sh] - https://weakpassword-detect.surge.sh/
- Backend [hosted at AWS] - https://weakpasswords.pushpendrahpx.me/
#### Offline Version
##### Steps
1. `git clone <repository>`
2. `docker-compose up`

- Python Server [directory] - **./server_backend/**
- React App [directory] - **./login/**


### What is Bloom-filter & how it works?
`Probably Yes, Confirm No` data structure

Here we trade off on accuracy and get better time complexity.

It results in false positive results.

It never results in false negative results, which means telling no, but if it exists on the set, this will never happen.

- The false positive case of Bloom-filters can be huge-downside or okay, depends on the size of the bloom-filter.
- We can control the probability of getting a false-positive by controlling the size of bloom-filter. More spaces means fewer false-positive cases. If we want to decrease probability of a 
false-positive result, we have to use more number of hash functions & larger bit array.

### Operations it must have

1. Add - to insert an element in Bloom-filter
2. Check - to check an element exists in set not

Probability of hash-function is 
<img width="306" alt="image" src="https://user-images.githubusercontent.com/48829314/229110063-53cd00a9-86e9-4d53-afea-eb73d97fe8ce.png">

<img width="710" alt="image" src="https://user-images.githubusercontent.com/48829314/229110125-4b486897-d327-445f-8a14-c5b6d1c7aec5.png">



#### References
1. https://www.geeksforgeeks.org/bloom-filters-introduction-and-python-implementation/
