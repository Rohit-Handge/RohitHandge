#include <iostream>
#include <vector>
#include <algorithm>

class GraphAnalyzer {
public:
    int maxSumScoreNode(std::vector<int>& edges) {
        int n = edges.size();
        // Use a vector to store the edge score for each node.
        // Using long long to prevent potential integer overflow during summation.
        std::vector<long long> scores(n, 0);

        // For each node i, there is a directed edge from i to edges[i].
        // This means node i points to target node: edges[i].
        // The edge score of a node is the sum of the labels (indices) of all nodes pointing to it.
        for (int i = 0; i < n; ++i) {
            int target = edges[i];
            scores[target] += i;
        }

        int maxNode = 0;
        long long maxScore = scores[0];

        // Find the node with the highest edge score.
        // If there's a tie, we keep the smaller index because we iterate from 0 to n-1 
        // and use strictly greater than (>) for maxScore update.
        for (int i = 1; i < n; ++i) {
            if (scores[i] > maxScore) {
                maxScore = scores[i];
                maxNode = i;
            }
        }

        return maxNode;
    }
};

int main() {
    GraphAnalyzer analyzer;

    std::vector<int> edges1 = {1, 0, 0, 0, 0, 7, 7, 5};
    std::cout << "Input: edges = [1, 0, 0, 0, 0, 7, 7, 5]\nOutput: " << analyzer.maxSumScoreNode(edges1) << "\n\n";

    std::vector<int> edges2 = {2, 0, 0, 2};
    std::cout << "Input: edges = [2, 0, 0, 2]\nOutput: " << analyzer.maxSumScoreNode(edges2) << "\n";

    return 0;
}