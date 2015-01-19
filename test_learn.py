#!/usr/bin/env python
# -*- coding: utf8 -*-
from sklearn.datasets import make_hastie_10_2
from sklearn.ensemble import GradientBoostingClassifier

import json
import sys
import os
import re
import random 

def class_by_bool(val):
  if val != 0:
    return 1
  return -1
def load_from_file():
  X = []
  y = []
  for file in os.listdir('.'):
    if re.match(r'^http', file):
      f = open(file, 'r')
      text = f.read()
      data = json.loads(text)
      groups = [f for f in data['groups'] if f[0] != 0]
      groups_0 = [f for f in groups if f[-1] == 0]
      groups_1 = [f for f in groups if f[-1] == 1]

      for group in groups_0 + groups_1 * len(groups_0):
        X.append(group[:-1])
        y.append(class_by_bool(group[-1]))
        #print group
      print file
  return X, y
X, y = load_from_file()
#print X #[:10]
#print y #[:10]
#sys.exit(0)
n = len(y)
perm = range(n)
random.shuffle(perm)
def p(a,ids):
  return [a[e] for e in ids]

X_train, X_test = X[:n/2], X[n/2:]
y_train, y_test = y[:n/2], y[n/2:]
#X_train, X_test = p(X,perm[:n/2]), p(X,perm[n/2:])
#y_train, y_test = p(y,perm[:n/2]), p(y,perm[n/2:])

#X, y = make_hastie_10_2(random_state=0)
#X_train, X_test = X[:2000], X[2000:]
#y_train, y_test = y[:2000], y[2000:]

clf = GradientBoostingClassifier(n_estimators=100, learning_rate=1.0,
    max_depth=1, random_state=0).fit(X_train, y_train)
print clf.score(X_test, y_test) 
