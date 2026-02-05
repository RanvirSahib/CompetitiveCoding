#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;

        if (n <= 3) {
            cout << -1 << '\n';
            continue;
        }

        vector<int> even, odd;

        for (int i = 1; i <= n; i++) {
            if (i % 2 == 0) even.push_back(i);
            else odd.push_back(i);
        }

        // print evens
        for (int x : even) cout << x << " ";

        // print odds in reverse
        reverse(odd.begin(), odd.end());
        for (int x : odd) cout << x << " ";

        cout << '\n';
    }
    return 0;
}
