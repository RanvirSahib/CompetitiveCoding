#include <iostream>
using namespace std;

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        string s;
        cin >> s;

        int freq[26] = {0};

        for (int i = 0; i < n; i++) {
            freq[s[i] - 'a']++;
        }
 int maxChar = 0;
        for (int i = 1; i < 26; i++) {
            if (freq[i] > freq[maxChar]) {
                maxChar = i;
            }
        }
        int minChar = -1;
    for (int i = 0; i < 26; i++) {
            if (freq[i] > 0 && i != maxChar) {
                if (minChar == -1 || freq[i] < freq[minChar]) {
                    minChar = i;
                }
            }
        }

        if (minChar == -1) {
            cout << s << endl;
            continue;
        }

        for (int i = 0; i < n; i++) {
            if (s[i] - 'a' == minChar) {
                s[i] = char(maxChar + 'a');
                break;
            }
        }

        cout << s << endl;
    }

    return 0;
}
