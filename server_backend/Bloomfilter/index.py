import math
import mmh3
from bitarray import bitarray
  
class BloomFilter:
    def __init__(self, count=100, fp=0.01):
        self.fp_prob = fp
        self.size = self.get_size(count, fp)
        self.hash_count = self.get_hash_functions(self.size, count)
        self.bit_array = bitarray(self.size)
        self.bit_array.setall(0)

    def add(self, item):
        tmps = []
        for i in range(self.hash_count):
            tmp = mmh3.hash(item, i)%self.size
            self.bit_array[tmp] = True
        

    def check(self, item):
        for i in range(self.hash_count):
            tmp = mmh3.hash(item, i)%self.size
            if(self.bit_array[tmp] != True):
                return False
        return True

    def get_size(self, n, p):
        m = -(n * math.log(p))/(math.log(2)**2)
        return int(m)
    def get_hash_functions(self, m, n):
        k = (m/n) * math.log(2)
        return int(k)