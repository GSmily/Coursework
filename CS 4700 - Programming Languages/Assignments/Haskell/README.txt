Gavin Browning
A01887359
Haskell - Persistent Red Black Tree

Requires GHC

Functions / Test Cases:

Test Case 1:
*RedBlackTrees> let ascendingTree = insertList [8,7,6,5,4,3,2,1]
*RedBlackTrees> putStr $ displayTree ascendingTree
*RedBlackTrees> height ascendingTree

Test Case 2:
*RedBlackTrees> let descendingTree = insertList [1,2,3,4,5,6,7,8]
*RedBlackTrees> putStr $ displayTree descendingTree
*RedBlackTrees> height descendingTree

Test Case 3:
*RedBlackTrees> let arbitraryTree = insertList [1..500]
*RedBlackTrees> putStr $ displayTree arbitraryTree
*RedBlackTrees> height arbitraryTree