-- Gavin Browning
-- A01887359
-- Haskell - Persistent Red Black Tree

module RedBlackTrees where

-- Data Type that holds the color.
data Color = R | B deriving (Eq, Read)

-- Shows the red node as "R" and black node as "B".
instance Show Color where
  show R = "R"
  show B = "B"

-- Data type that is the red black RedBlackTree.
data RedBlackTree a = Empty | Node Color (RedBlackTree a) a (RedBlackTree a) deriving (Eq, Read)

-- Function to declare an empty tree.
emptyTree :: RedBlackTree a
emptyTree = Empty

-- Function to balance the tree making the left sub-tree less than the root
-- and the right sub-tree greater than the root. 
-- Also balances the colors to make sure that 1) the root node is black,
-- 2) red nodes have black parents, 3) there are the same number of black
-- nodes on every path through the tree.
balanceTree :: Color -> RedBlackTree a -> a -> RedBlackTree a -> RedBlackTree a
balanceTree B (Node R (Node R l1 n1 r1) n2 l2) n3 r2 = Node R (Node B l1 n1 r1) n2 (Node B l2 n3 r2)
balanceTree B (Node R l1 n1 (Node R r1 n2 l2)) n3 r2 = Node R (Node B l1 n1 r1) n2 (Node B l2 n3 r2)
balanceTree B l1 n1 (Node R (Node R r1 n2 l2) n3 r2) = Node R (Node B l1 n1 r1) n2 (Node B l2 n3 r2)
balanceTree B l1 n1 (Node R r1 n2 (Node R l2 n3 r2)) = Node R (Node B l1 n1 r1) n2 (Node B l2 n3 r2)
balanceTree c l1 n1 r1 = Node c l1 n1 r1

-- Function to inserts and balances values in the tree.
insert :: (Ord a) => a -> RedBlackTree a -> RedBlackTree a
insert n1 s = turnBlack $ ins s
  where ins Empty  = Node R Empty n1 Empty
        ins (Node color l n2 r)
          | n1 < n2  = balanceTree color (ins l) n2 r
          | n1 == n2 = Node color l n2 r
          | n1 > n2  = balanceTree color l n2 (ins r)
        turnBlack (Node _ l n2 r) = Node B l n2 r

-- Function to insert a list of N values to the red black tree.
-- Inserts from right to left
insertList :: (Foldable t, Ord a) => t a -> RedBlackTree a
insertList = foldr insert Empty

-- Function to find longest path/height
height :: (RedBlackTree a) -> Int
height Empty = 0
height (Node _ l _ r ) = if tl > tr then tl + 1 else tr + 1
                    where tl  = height l
                          tr  = height r

-- Displays a pretty RedBlackTree.
displayTree :: Show a => RedBlackTree a -> String
displayTree Empty = "Empty tree."
displayTree (Node c l n r) =
  unlines (displayHelper (Node c l n r))
    where
      padding :: String -> String -> [String] -> [String]
      padding first rest = zipWith (++) (first : repeat rest)
      
      displaySubtree :: Show a => RedBlackTree a -> RedBlackTree a -> [String]
      displaySubtree l r = padding "  +- " "  | " (displayHelper l) ++ padding "  `- " "   " (displayHelper r)
      
      displayHelper :: Show a => RedBlackTree a -> [String]
      displayHelper Empty = []
      displayHelper (Node c l n r) = (show n ++ show c) : displaySubtree r l
