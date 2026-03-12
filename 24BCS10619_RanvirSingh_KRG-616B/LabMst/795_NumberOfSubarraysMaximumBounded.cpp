class Solution {
public:

    int countBound(vector<int>& nums, int bound){
        int count = 0;
        int curr = 0;

        for(int num : nums){
            if(num <= bound){
                curr++;
            }else{
                curr = 0;
            }
            count += curr;
        }

        return count;
    }

    int numSubarrayBoundedMax(vector<int>& nums, int left, int right) {
        return countBound(nums, right) - countBound(nums, left - 1);
    }
};