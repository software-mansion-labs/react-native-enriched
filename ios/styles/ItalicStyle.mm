#import "StyleHeaders.h"
#import "EnrichedTextInputView.h"
#import "FontExtension.h"
#import "OccurenceUtils.h"

@implementation ItalicStyle {
  EnrichedTextInputView *_input;
}

+ (StyleType)getStyleType { return Italic; }

- (instancetype)initWithInput:(id)input {
  self = [super init];
  _input = (EnrichedTextInputView *)input;
  return self;
}

- (void)applyStyle:(NSRange)range {
  BOOL isStylePresent = [self detectStyle:range];
  if(range.length >= 1) {
    isStylePresent ? [self removeAttributes:range] : [self addAttributes:range];
  } else {
    isStylePresent ? [self removeTypingAttributes] : [self addTypingAttributes];
  }
}

- (void)addAttributes:(NSRange)range {
  [_input->textView.textStorage beginEditing];
  [_input->textView.textStorage enumerateAttribute:NSFontAttributeName inRange:range options:0
    usingBlock:^(id  _Nullable value, NSRange range, BOOL * _Nonnull stop) {
      UIFont *font = (UIFont *)value;
      if(font != nullptr) {
        UIFont *newFont = [font setItalic];
        [_input->textView.textStorage addAttribute:NSFontAttributeName value:newFont range:range];
      }
    }
  ];
  [_input->textView.textStorage endEditing];
}

- (void)addTypingAttributes {
  UIFont *currentFontAttr = (UIFont *)_input->textView.typingAttributes[NSFontAttributeName];
  if(currentFontAttr != nullptr) {
    NSMutableDictionary *newTypingAttrs = [_input->textView.typingAttributes mutableCopy];
    newTypingAttrs[NSFontAttributeName] = [currentFontAttr setItalic];
    _input->textView.typingAttributes = newTypingAttrs;
  }
}

- (void)removeAttributes:(NSRange)range {
  [_input->textView.textStorage beginEditing];
  [_input->textView.textStorage enumerateAttribute:NSFontAttributeName inRange:range options:0
    usingBlock:^(id  _Nullable value, NSRange range, BOOL * _Nonnull stop) {
      UIFont *font = (UIFont *)value;
      if(font != nullptr) {
        UIFont *newFont = [font removeItalic];
        [_input->textView.textStorage addAttribute:NSFontAttributeName value:newFont range:range];
      }
    }
  ];
  [_input->textView.textStorage endEditing];
}

- (void)removeTypingAttributes {
  UIFont *currentFontAttr = (UIFont *)_input->textView.typingAttributes[NSFontAttributeName];
  if(currentFontAttr != nullptr) {
    NSMutableDictionary *newTypingAttrs = [_input->textView.typingAttributes mutableCopy];
    newTypingAttrs[NSFontAttributeName] = [currentFontAttr removeItalic];
    _input->textView.typingAttributes = newTypingAttrs;
  }
}

- (BOOL)styleCondition:(id _Nullable)value :(NSRange)range {
  UIFont *font = (UIFont *)value;
  return font != nullptr && [font isItalic];
}

- (BOOL)detectStyle:(NSRange)range {
  if(range.length >= 1) {
    return [OccurenceUtils detect:NSFontAttributeName withInput:_input inRange:range
      withCondition: ^BOOL(id  _Nullable value, NSRange range) {
        return [self styleCondition:value :range];
      }
    ];
  } else {
    UIFont *currentFontAttr = (UIFont *)_input->textView.typingAttributes[NSFontAttributeName];
    if(currentFontAttr == nullptr) {
      return false;
    }
    return [currentFontAttr isItalic];
  }
}

- (BOOL)anyOccurence:(NSRange)range {
  return [OccurenceUtils any:NSFontAttributeName withInput:_input inRange:range
    withCondition:^BOOL(id  _Nullable value, NSRange range) {
      return [self styleCondition:value :range];
    }
  ];
}

- (NSArray<StylePair *> *_Nullable)findAllOccurences:(NSRange)range {
  return [OccurenceUtils all:NSFontAttributeName withInput:_input inRange:range
    withCondition:^BOOL(id  _Nullable value, NSRange range) {
      return [self styleCondition:value :range];
    }
  ];
}

@end
