#pragma once
#import <UIKit/UIKit.h>

@interface ParagraphsUtils : NSObject
+ (NSArray *)getSeparateParagraphsRangesIn:(UITextView *)textView range:(NSRange)range;
@end
