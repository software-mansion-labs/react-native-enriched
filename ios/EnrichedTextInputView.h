#pragma once
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>
#import "InputConfig.h"
#import "InputParser.h"
#import "BaseStyleProtocol.h"
#import "InputTextView.h"

#ifndef EnrichedTextInputViewNativeComponent_h
#define EnrichedTextInputViewNativeComponent_h

NS_ASSUME_NONNULL_BEGIN

@interface EnrichedTextInputView : RCTViewComponentView {
  @public InputTextView *textView;
  @public NSRange recentlyChangedRange;
  @public InputConfig *config;
  @public InputParser *parser;
  @public NSMutableDictionary<NSAttributedStringKey, id> *defaultTypingAttributes;
  @public NSDictionary<NSNumber *, id<BaseStyleProtocol>> *stylesDict;
  @public BOOL blockEmitting;
  @public BOOL emitHtml;
}
- (CGSize)measureSize:(CGFloat)maxWidth;
- (void)emitOnLinkDetectedEvent:(NSString *)text url:(NSString *)url range:(NSRange)range;
- (void)emitOnMentionEvent:(NSString *)indicator text:(nullable NSString *)text;
- (void)anyTextMayHaveBeenModified;
- (BOOL)handleStyleBlocksAndConflicts:(StyleType)type range:(NSRange)range;
@end

NS_ASSUME_NONNULL_END

#endif /* EnrichedTextInputViewNativeComponent_h */
