#import "WordsUtils.h"

@implementation WordsUtils

+ (NSArray<NSDictionary *> *)getAffectedWordsFromText:(NSString *)text modificationRange:(NSRange)range {
  if(text.length == 0) {
    return [[NSArray alloc] init];
  }

  NSInteger leftIt = range.location - 1;
  if (leftIt > 0) {
    while (leftIt >= 0) {
      unichar charAtIndex = [text characterAtIndex:leftIt];
      if ([[NSCharacterSet whitespaceAndNewlineCharacterSet] characterIsMember:charAtIndex]) {
        leftIt += 1;
        break;
      }
      leftIt -= 1;
    }
  }
  leftIt = MAX(0, leftIt);
  
  NSInteger rightIt = range.location + range.length;
  if (rightIt < text.length - 1) {
    while (rightIt <= text.length - 1) {
      unichar charAtIndex = [text characterAtIndex:rightIt];
      if ([[NSCharacterSet whitespaceAndNewlineCharacterSet] characterIsMember:charAtIndex]) {
        rightIt -= 1;
        break;
      }
      rightIt += 1;
    }
  }
  rightIt = MIN(text.length - 1, rightIt);
  
  NSMutableArray<NSDictionary *> *separatedWords = [[NSMutableArray<NSDictionary *> alloc] init];
  NSMutableString *currentWord = [[NSMutableString alloc] init];
  NSInteger currentRangeStart = leftIt;
  NSInteger currentIdx = leftIt;
  
  while (currentIdx <= rightIt) {
    unichar charAtIndex = [text characterAtIndex:currentIdx];
    if ([[NSCharacterSet whitespaceAndNewlineCharacterSet] characterIsMember:charAtIndex]) {
      if (currentWord.length > 0) {
        [separatedWords addObject:@{
          @"word": [currentWord copy],
          @"range": [NSValue valueWithRange:NSMakeRange(currentRangeStart, currentWord.length)]
        }];
        [currentWord setString:@""];
        currentRangeStart = currentIdx + 1;
      }
    } else {
      [currentWord appendFormat:@"%C", charAtIndex];
    }
    currentIdx += 1;
  }
  
  if (currentWord.length > 0) {
    [separatedWords addObject:@{
      @"word": [currentWord copy],
      @"range": [NSValue valueWithRange:NSMakeRange(currentRangeStart, rightIt - currentRangeStart + 1)]
    }];
  }
  
  return separatedWords;
}

@end
