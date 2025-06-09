import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import type {
  DirectEventHandler,
  Float,
  Int32,
  UnsafeMixed,
} from 'react-native/Libraries/Types/CodegenTypes';
import type { ColorValue, HostComponent, ViewProps } from 'react-native';
import React from 'react';

export interface OnChangeTextEvent {
  value: string;
}

export interface OnChangeHtmlEvent {
  value: string;
}

export interface OnChangeStateEvent {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikeThrough: boolean;
  isInlineCode: boolean;
  isH1: boolean;
  isH2: boolean;
  isH3: boolean;
  isCodeBlock: boolean;
  isBlockQuote: boolean;
  isOrderedList: boolean;
  isUnorderedList: boolean;
  isLink: boolean;
  isImage: boolean;
  isMention: boolean;
}

export interface OnLinkDetected {
  text: string;
  url: string;
}

export interface OnMentionDetectedInternal {
  text: string;
  payload: string;
}

export interface OnMentionDetected {
  text: string;
  attributes: Record<string, string>;
}

export interface OnMentionEvent {
  indicator: string;
  text: UnsafeMixed;
}

export interface OnChangeSelectionEvent {
  start: Int32;
  end: Int32;
  text: string;
}

export interface MentionStyleProperties {
  color?: ColorValue;
  backgroundColor?: ColorValue;
  textDecorationLine?: 'underline' | 'none';
}

export interface RichTextStyleInternal {
  h1?: {
    fontSize?: Float;
  };
  h2?: {
    fontSize?: Float;
  };
  h3?: {
    fontSize?: Float;
  };
  blockquote?: {
    borderColor?: ColorValue;
    borderWidth?: Float;
    gapWidth?: Float;
  };
  codeblock?: {
    color?: ColorValue;
    borderRadius?: Float;
    backgroundColor?: ColorValue;
  };
  code?: {
    color?: ColorValue;
    backgroundColor?: ColorValue;
  };
  a?: {
    color?: ColorValue;
    textDecorationLine?: string;
  };
  // This is a workaround for the fact that codegen does not support Records.
  // Instead, we pass an empty object as a type.
  // However, this object is not empty in practice, and will become ReadableMap on the native side
  mention?: {};
  img?: {
    width?: Float;
    height?: Float;
  };
  ol?: {
    gapWidth?: Float;
    marginLeft?: Float;
  };
  ul?: {
    bulletColor?: ColorValue;
    bulletSize?: Float;
    marginLeft?: Float;
    gapWidth?: Float;
  };
}

export interface NativeProps extends ViewProps {
  // base props
  autoFocus?: boolean;
  editable?: boolean;
  defaultValue?: string;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  mentionIndicators: string[];
  cursorColor?: ColorValue;
  selectionColor?: ColorValue;
  richTextStyle?: RichTextStyleInternal;

  // event callbacks
  onInputFocus?: DirectEventHandler<null>;
  onInputBlur?: DirectEventHandler<null>;
  onChangeText?: DirectEventHandler<OnChangeTextEvent>;
  onChangeHtml?: DirectEventHandler<OnChangeHtmlEvent>;
  onChangeState?: DirectEventHandler<OnChangeStateEvent>;
  onLinkDetected?: DirectEventHandler<OnLinkDetected>;
  onMentionDetected?: DirectEventHandler<OnMentionDetectedInternal>;
  onMention?: DirectEventHandler<OnMentionEvent>;
  onChangeSelection?: DirectEventHandler<OnChangeSelectionEvent>;

  // Style related props - used for generating proper setters in component's manager
  // These should not be passed as regular props
  color?: ColorValue;
  fontSize?: Float;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;

  // Used for onChangeHtml event performance optimization
  onChangeHtmlSet: boolean;
}

type ComponentType = HostComponent<NativeProps>;

interface NativeCommands {
  // General commands
  focus: (viewRef: React.ElementRef<ComponentType>) => void;
  blur: (viewRef: React.ElementRef<ComponentType>) => void;
  setValue: (viewRef: React.ElementRef<ComponentType>, text: string) => void;

  // Text formatting commands
  toggleBold: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleItalic: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleUnderline: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleStrikeThrough: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleInlineCode: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleH1: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleH2: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleH3: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleCodeBlock: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleBlockQuote: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleOrderedList: (viewRef: React.ElementRef<ComponentType>) => void;
  toggleUnorderedList: (viewRef: React.ElementRef<ComponentType>) => void;
  addLink: (
    viewRef: React.ElementRef<ComponentType>,
    start: Int32,
    end: Int32,
    text: string,
    url: string
  ) => void;
  addImage: (viewRef: React.ElementRef<ComponentType>, uri: string) => void;
  startMention: (
    viewRef: React.ElementRef<ComponentType>,
    indicator: string
  ) => void;
  addMention: (
    viewRef: React.ElementRef<ComponentType>,
    indicator: string,
    text: string,
    payload: string
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: [
    // General commands
    'focus',
    'blur',
    'setValue',

    // Text formatting commands
    'toggleBold',
    'toggleItalic',
    'toggleUnderline',
    'toggleStrikeThrough',
    'toggleInlineCode',
    'toggleH1',
    'toggleH2',
    'toggleH3',
    'toggleCodeBlock',
    'toggleBlockQuote',
    'toggleOrderedList',
    'toggleUnorderedList',
    'addLink',
    'addImage',
    'startMention',
    'addMention',
  ],
});

export default codegenNativeComponent<NativeProps>(
  'ReactNativeRichTextEditorView',
  {
    interfaceOnly: true,
  }
) as HostComponent<NativeProps>;
