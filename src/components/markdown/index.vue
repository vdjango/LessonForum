<template lang="html">
    <div
            :class="isFullscreen?'markdown fullscreen':'markdown' "
            ref="markdown"
            :style="{width:editorWidth+'px',height:editorHeight+'px'}">
        <!-- 头部工具栏 -->
        <ul class="markdown-toolbars">
            <li>
                <slot name="title"/>
            </li>
            <li v-if="tools.strong" name="粗体">
                <span @click="insertStrong" class="iconfont icon-strong"></span>
            </li>
            <li v-if="tools.italic" name="斜体">
                <span @click="insertItalic" class="iconfont icon-italic"></span>
            </li>
            <li v-if="tools.overline" name="删除线">
                <span @click="insertOverline" class="iconfont icon-overline"></span>
            </li>
            <li v-if="tools.h1" name="标题1">
                <span style="font-size: 16px;" @click="insertTitle(1)">h1</span>
            </li>
            <li v-if="tools.h2" name="标题2">
                <span style="font-size: 16px;" @click="insertTitle(2)">h2</span>
            </li>
            <li v-if="tools.h3" name="标题3">
                <span style="font-size: 16px;" @click="insertTitle(3)">h3</span>
            </li>
            <li v-if="tools.h4" name="标题4">
                <span style="font-size: 16px;" @click="insertTitle(4)">h4</span>
            </li>
            <li v-if="tools.h5" name="标题5">
                <span style="font-size: 16px;" @click="insertTitle(5)">h5</span>
            </li>
            <li v-if="tools.h6" name="标题6">
                <span style="font-size: 16px;" @click="insertTitle(6)">h6</span>
            </li>
            <li v-if="tools.hr" name="分割线">
                <span @click="insertLine" class="iconfont icon-horizontal"></span>
            </li>
            <li v-if="tools.quote" name="引用">
                <span style="font-size: 16px;" @click="insertQuote" class="iconfont icon-quote"></span>
            </li>
            <li v-if="tools.ul" name="无序列表">
                <span @click="insertUl" class="iconfont icon-ul"></span>
            </li>
            <li v-if="tools.ol" name="有序列表">
                <span @click="insertOl" class="iconfont icon-ol"></span>
            </li>
            <li v-if="tools.code" name="代码块">
                <span @click="insertCode" class="iconfont icon-code"></span>
            </li>
            <li v-if="tools.notChecked" name="未完成列表">
                <span @click="insertNotFinished" class="iconfont icon-checked-false"></span>
            </li>
            <li v-if="tools.checked" name="已完成列表">
                <span @click="insertFinished" class="iconfont icon-checked"></span>
            </li>
            <li v-if="tools.link" name="链接">
                <span @click="insertLink" class="iconfont icon-link"></span>
            </li>
            <li v-if="tools.image" name="图片">
                <!-- @click="insertImage" -->
                <span @click="outerVisible = true" class="iconfont icon-img"></span>
            </li>
            <li v-if="tools.table" name="表格">
                <span @click="insertTable" class="iconfont icon-table"></span>
            </li>
            <li v-if="tools.print" name="打印">
                <span class="iconfont icon-dayin" @click="print"></span>
            </li>
            <li v-if="tools.theme" class="shift-theme" name="代码块主题">
                <div>
                    <span class="iconfont icon-yanse" @click="themeSlideDown=!themeSlideDown"></span>
                    <ul :class="{active:themeSlideDown}" @mouseleave="themeSlideDown=false">
                        <li @click="setThemes('Light')">Light</li>
                        <li @click="setThemes('Dark')">VS Code</li>
                        <li @click="setThemes('OneDark')">Atom OneDark</li>
                        <li @click="setThemes('GitHub')">GitHub</li>
                    </ul>
                </div>
            </li>
            <li name="导入本地文件" class="import-file" v-show="tools.importmd">
                <span class="iconfont icon-daoru" @click="importFile"></span>
                <input type="file" @change="importFile($event)" accept="text/markdown">
            </li>
            <li name="保存到本地" v-show="tools.exportmd">
                <span class="iconfont icon-download" @click="exportMd"></span>
            </li>
            <li v-if="tools.shift&&preview==2" name="全屏编辑">
                <span @click="preview=3" class="iconfont icon-md"></span>
            </li>
            <li v-if="tools.shift&&preview==3" name="分屏显示">
                <span @click="preview=1" class="iconfont icon-group"></span>
            </li>
            <li v-if="tools.shift&&preview==1" name="预览">
                <span @click="preview=2" class="iconfont icon-preview"></span>
            </li>
            <li :name="scrolling?'同步滚动:开':'同步滚动:关'">
                <span @click="scrolling=!scrolling" v-show="scrolling" class="iconfont icon-on"></span>
                <span @click="scrolling=!scrolling" v-show="!scrolling" class="iconfont icon-off"></span>
            </li>
            <li class="empty"></li>

            <li v-if="tools.fullscreen&&!isFullscreen" name="全屏">
                <span @click="isFullscreen=!isFullscreen" class="iconfont icon-full-screen"></span>
            </li>
            <li v-if="tools.fullscreen&&isFullscreen" name="退出全屏">
                <span @click="isFullscreen=!isFullscreen" class="iconfont icon-exit-full-screen"></span>
            </li>
        </ul>
        <!-- 编辑器 -->
        <div class="markdown-content" :style="{background:preview==2?'#fff':''}">
            <div v-show="preview===1||preview===3" class="markdown-editor" ref="markdownContent"
                 @scroll="markdownScroll"
                 @mouseenter="mousescrollSide('markdown')">
                <ul class="index" ref="index" :style="{height:scrollHeight?`${scrollHeight}px`:'100%'}">
                    <li v-for="(item,index) in indexLenth">{{index+1}}</li>
                </ul>
                <textarea
                        :value="values"
                        @input="$emit('input', $event.target.value)"
                        @keydown.tab="tab"
                        @keyup.enter="enter"
                        @keyup.delete="onDelete"
                        ref="textarea"
                        :style="{height:scrollHeight?`${scrollHeight}px`:'100%'}"
                ></textarea>
            </div>
            <div v-show="preview==1" class="empty" style="width:12px;"></div>
            <div
                    v-show="preview===1||preview===2"
                    :class="`markdown-preview ${themeName}`"
                    ref="preview"
                    @scroll="previewScroll"
                    @mouseenter="mousescrollSide('preview')">
                <div v-html="html"
                     ref="previewInner"></div>
            </div>
        </div>
        <!--    预览图片-->
        <div :class="['preview-img',previewImgModal?'active':'']">
            <span class="close" @click="previewImgModal=false">关闭</span>
            <img :src="previewImgSrc" :class="[previewImgMode]" alt="">
        </div>

        <el-dialog title="上传图片" :visible.sync="outerVisible">
            <el-upload :action="api + '/app/article-image-update/'" list-type="picture-card"
                       :headers="headers"
                       :data="updateData"
                       :on-success="updateImageSuccess"
                       :auto-upload="true">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                    <img lass="el-upload-list__item-thumbnail" :src="file.url" alt="">
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                          <i class="el-icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="el-icon-delete"></i>
                        </span>
                    </span>
                </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary">打开内层 Dialog</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import markdown from './markdown'
  import {
    Dialog,
    Button,
    Upload
  } from 'element-ui'

  import hljs from './js/hljs'
  import marked from 'marked'
  import {
    saveFile
  } from './js/utils'
  import defaultTools from './js/tools'

  hljs.initHighlightingOnLoad()
  const renderer = new marked.Renderer()

  marked.setOptions({
    renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })

  export default {
    name: 'markdown',
    model: {
      /**
       * 自定义组件的 v-model
       */
      prop: 'value',
      event: 'input'
    },
    props: {
      initialValue: String, // 初始化内容
      value: {
        type: String,
        default () {
          return ''
        }
      }, // 自定义组件的 v-model
      theme: { // 默认主题
        type: String,
        default: 'Light'
      },
      width: { // 初始化宽度
        type: [Number, String],
        default: 'auto'
      },
      height: { // 初始化高度
        type: Number,
        default: 600
      }, // 宽度
      toolbars: { // 工具栏
        type: Object,
        default () {
          return {}
        }
      },
      autoSave: { // 是否自动保存
        type: Boolean,
        default: true
      },
      interval: { // 自动保存间隔 mm
        type: Number,
        default: 100000
      },
      exportFileName: { // 默认导出文件名称
        type: String,
        default: '未命名文件'
      },
      markedOptions: {
        type: Object,
        default () {
          return {}
        }
      },
      api: {
        type: String,
        default: function () {
          return 'http://127.0.0.1:8000'
        }
      },
      headers: {
        type: Object,
        default: function () {
          return ''
        }
      },
      updateData: {
        type: Object,
        default: function () {
          return {}
        }
      },
    },
    data () {
      return {
        values: '', // 输入框内容
        timeoutId: null,
        indexLenth: 100,
        html: '',
        preview: 1, // 是否是预览状态
        isFullscreen: false, // 是否是全屏
        scrollHeight: null,
        scroll: 'markdown', // 哪个半栏在滑动
        themeName: '', // 主题名称
        lastInsert: '',
        timerId: null, // 定时器id
        themeSlideDown: false,
        imgs: [],
        scrolling: true, // 同步滚动
        editorHeight: '',
        editorWidth: '',
        previewImgModal: false,
        previewImgSrc: '',
        previewImgMode: '',

        // update image
        imageList: [],
        outerVisible: false,
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      }
    },
    computed: {
      tools () {
        const {
          toolbars = {}
        } = this
        return {
          ...defaultTools,
          ...toolbars
        }
      }
    },
    mounted () {
      this.init()
      setTimeout(() => {
        const textarea = this.$refs.textarea
        textarea.focus()
        textarea.addEventListener('keydown', e => {
          if (e.keyCode === 83) {
            if (e.metaKey || e.ctrlKey) {
              e.preventDefault()
              this.handleSave()
            }
          }
        })
        textarea.addEventListener('paste', this.handlePaste)
        if (this.autoSave) {
          this.timerId = setInterval(() => {
            this.handleSave()
          }, this.interval)
        }
      }, 20)
    },
    methods: {
      init () {
        this.values = this.initialValue
        this.themeName = this.theme
        this.editorHeight = this.height
        this.editorWidth = this.width
      },
      handlePaste (e) { // 粘贴图片
        const {
          clipboardData = {}
        } = e
        const {
          types = [], items
        } = clipboardData
        let item = null
        for (let i = 0; i < types.length; i++) {
          if (types[i] === 'Files') {
            item = items[i]
            break
          }
        }
        if (item) {
          const file = item.getAsFile()
          if (/image/ig.test(file.type)) {
            this.$emit('on-paste-image', file)
            e.preventDefault()
          }
        }
      },
      markdownScroll () {
        const {
          scrolling
        } = this
        if (!scrolling) {
          return
        }
        if (this.scroll === 'markdown') {
          const markdownContent = this.$refs.markdownContent
          const preview = this.$refs.preview
          const markdownScrollHeight = markdownContent.scrollHeight
          const markdownScrollTop = markdownContent.scrollTop
          const previewScrollHeight = preview.scrollHeight
          preview.scrollTop = parseInt(markdownScrollTop / markdownScrollHeight * previewScrollHeight, 0)
        }
      },
      previewScroll () {
        const {
          scrolling
        } = this
        if (!scrolling) {
          return
        }
        if (this.scroll === 'preview') {
          const markdownContent = this.$refs.markdownContent
          const preview = this.$refs.preview
          const markdownScrollHeight = markdownContent.scrollHeight
          const previewScrollHeight = preview.scrollHeight
          const previewScrollTop = preview.scrollTop
          markdownContent.scrollTop = parseInt(previewScrollTop / previewScrollHeight * markdownScrollHeight, 0)
        }
      },
      mousescrollSide (side) { // 设置究竟是哪个半边在主动滑动
        this.scroll = side
      },
      insertContent (initStr) { // 插入文本
        const {
          preview
        } = this
        if (preview === 2) {
          return
        }
        this.lastInsert = initStr
        const point = this.getCursortPosition()
        const lastChart = this.values.substring(point - 1, point)
        const lastFourCharts = this.values.substring(point - 4, point)
        if (lastChart !== '\n' && this.values !== '' && lastFourCharts !== '    ') {
          const str = '\n' + initStr + '\n'
          this.insertAfterText(str)
        } else {
          this.insertAfterText(initStr)
        }
      },
      getCursortPosition () { // 获取光标位置
        const textDom = this.$refs.textarea
        let cursorPos = 0
        if (document.selection) {
          textDom.focus()
          let selectRange = document.selection.createRange()
          selectRange.moveStart('character', -this.values.length)
          cursorPos = selectRange.text.length
        } else if (textDom.selectionStart || parseInt(textDom.selectionStart, 0) === 0) {
          cursorPos = textDom.selectionStart
        }
        return cursorPos
      },
      insertAfterText (value) { // 插入文本
        const textDom = this.$refs.textarea
        let selectRange
        if (document.selection) {
          textDom.focus()
          selectRange = document.selection.createRange()
          selectRange.text = value
          textDom.focus()
        } else if (textDom.selectionStart || parseInt(textDom.selectionStart, 0) === 0) {
          const startPos = textDom.selectionStart
          const endPos = textDom.selectionEnd
          const scrollTop = textDom.scrollTop
          textDom.value = textDom.value.substring(0, startPos) + value + textDom.value.substring(endPos, textDom.value.length)
          textDom.focus()
          textDom.selectionStart = startPos + value.length
          textDom.selectionEnd = startPos + value.length
          textDom.scrollTop = scrollTop
        } else {
          textDom.value += value
          textDom.focus()
        }
        this.$set(this, 'values', textDom.value)
      },
      setCaretPosition (position) { // 设置光标位置
        const textDom = this.$refs.textarea
        if (textDom.setSelectionRange) {
          textDom.focus()
          textDom.setSelectionRange(position, position)
        } else if (textDom.createTextRange) {
          let range = textDom.createTextRange()
          range.collapse(true)
          range.moveEnd('character', position)
          range.moveStart('character', position)
          range.select()
        }
      },
      insertQuote () { // 引用
        this.insertContent('\n>   \n')
      },
      insertUl () { // 无需列表
        this.insertContent('-  \n')
      },
      insertOl () { // 有序列表
        this.insertContent('1. \n')
      },
      insertFinished () { // 已完成列表
        this.insertContent('- [x]  \n')
      },
      insertNotFinished () { // 未完成列表
        this.insertContent('- [ ]  \n')
      },
      insertLink () { // 插入链接
        this.insertContent('\n[插入链接](href) \n')
      },
      insertImage (image) { // 插入图片
        this.insertContent('\n![' + image.name + '](' + image.url + ') \n')
      },
      insertTable () { // 插入表格
        this.insertContent('\nheader 1 | header 2\n---|---\nrow 1 col 1 | row 1 col 2\nrow 2 col 1 | row 2 col 2\n\n')
      },
      insertCode () { // 插入code
        const point = this.getCursortPosition()
        const lastChart = this.values.substring(point - 1, point)
        this.insertContent('\n```\n\n``` \n')
        if (lastChart !== '\n' && this.values !== '') {
          this.setCaretPosition(point + 5)
        } else {
          this.setCaretPosition(point + 5)
        }
      },
      insertStrong () { // 粗体
        const point = this.getCursortPosition()
        const lastChart = this.values.substring(point - 1, point)
        this.insertContent('****')
        if (lastChart !== '\n' && this.values !== '') {
          this.setCaretPosition(point + 2)
        } else {
          this.setCaretPosition(point + 2)
        }
      },
      insertItalic () { // 斜体
        const point = this.getCursortPosition()
        const lastChart = this.values.substring(point - 1, point)
        this.insertContent('**')
        if (lastChart !== '\n' && this.values !== '') {
          this.setCaretPosition(point + 1)
        } else {
          this.setCaretPosition(point + 1)
        }
      },
      insertBg () { // 背景色
        const point = this.getCursortPosition()
        const lastChart = this.values.substring(point - 1, point)
        this.insertContent('====')
        if (lastChart !== '\n' && this.values !== '') {
          this.setCaretPosition(point + 5)
        } else {
          this.setCaretPosition(point + 5)
        }
      },
      insertUnderline () { // 下划线
        const point = this.getCursortPosition()
        const lastChart = this.values.substring(point - 1, point)
        this.insertContent('<u></u>')
        if (lastChart !== '\n' && this.values !== '') {
          this.setCaretPosition(point + 3)
        } else {
          this.setCaretPosition(point + 5)
        }
      },
      insertOverline () { // overline
        const point = this.getCursortPosition()
        const lastChart = this.values.substring(point - 1, point)
        this.insertContent('~~~~')
        if (lastChart !== '\n' && this.values !== '') {
          this.setCaretPosition(point + 2)
        } else {
          this.setCaretPosition(point + 2)
        }
      },
      insertTitle (level) { // 插入标题
        const titleLevel = {
          1: '#  \n',
          2: '##  \n',
          3: '###  \n',
          4: '####  \n',
          5: '#####  \n',
          6: '######  \n'
        }
        this.insertContent(titleLevel[level])
      },
      tab (e) { // 屏蔽teatarea tab默认事件
        this.insertContent('    ', this)
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      },
      handleSave () { // 保存操作
        const {
          value,
          html,
          themeName
        } = this
        this.$emit('on-save', {
          theme: themeName,
          value,
          html
        })
      },
      insertLine () { // 插入分割线
        this.insertContent('\n----\n')
      },
      toggleSlideDown () { // 显示主题选项
        this.slideDown = !this.slideDown
      },
      setThemes (name) { // 设置主题
        this.themeName = name
        this.themeSlideDown = false
      },
      enter () { // 回车事件
        const {
          lastInsert
        } = this
        const list = ['-  ', '1. ', '- [ ]  ', '- [x]  ']
        if (list.includes(lastInsert)) {
          this.insertContent(lastInsert)
        }
      },
      onDelete () { // 删除时,以回车为界分割，如果数组最后一个元素为''时，将行一次插入的共嗯那个置为空，避免回车时再次插入
        const lines = this.values.split('\n')
        if (lines[lines.length - 1] === '') {
          this.lastInsert = ''
        }
      },
      exportMd () { // 导出为.md格式
        saveFile(this.values, this.exportFileName + '.md')
      },
      importFile (e) { // 导入本地文件
        const file = e.target.files[0]
        if (!file) {
          return
        }
        const {
          type
        } = file
        if (type !== 'text/markdown') {
          this.$Notice.error('文件格式有误!')
          return
        }
        const reader = new FileReader()
        reader.readAsText(file, {
          encoding: 'utf-8'
        })
        reader.onload = () => {
          this.values = reader.result
          e.target.value = ''
        }
      },
      addImageClickLintener () { // 监听查看大图
        const {
          imgs
        } = this
        if (imgs.length > 0) {
          for (let i = 0, len = imgs.length; i < len; i++) {
            imgs[i].onclick = null
          }
        }
        setTimeout(() => {
          this.imgs = this.$refs.preview.querySelectorAll('img')
          for (let i = 0, len = this.imgs.length; i < len; i++) {
            this.imgs[i].onclick = () => {
              const src = this.imgs[i].getAttribute('src')
              this.previewImage(src)
            }
          }
        }, 600)
      },
      previewImage (src) { // 预览图片
        const img = new Image()
        img.src = src
        img.onload = () => {
          const width = img.naturalWidth
          const height = img.naturalHeight
          if ((height / width) > 1.4) {
            this.previewImgMode = 'horizontal'
          } else {
            this.previewImgMode = 'vertical'
          }
          this.previewImgSrc = src
          this.previewImgModal = true
        }
      },
      getValue () {
        return this.value
      },

      // update image
      handleRemove (file) {
        console.log(file)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleDownload (file) {
        console.log(file)
      },
      updateImageSuccess: function (response, file, fileList) {
        console.log(response, file, fileList)
        /**
         * fileList.0.response
         */
        this.insertImage({
          name: file.name,
          url: response.file
        })
        this.$emit('updateImageSuccess', fileList)
      }
    },
    watch: {
      initialValue () {
        this.values = this.initialValue
      },
      value () {
        this.values = this.value
        this.$emit('on-value', marked(this.values, {
          sanitize: false,
          ...this.markedOptions
        }))
      },
      values () {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
          this.html = marked(this.values, {
            sanitize: false,
            ...this.markedOptions
          })
        }, 30)
        this.indexLenth = this.values.split('\n').length
        const height1 = this.indexLenth * 22
        const height2 = this.$refs.textarea.scrollHeight
        const height3 = this.$refs.preview.scrollHeight
        this.scrollHeight = Math.max(height1, height2, height3)
        this.indexLenth = parseInt(this.scrollHeight / 22, 0) - 1
        this.addImageClickLintener()
      },
      theme () {
        this.themeName = this.theme
      },
      height () {
        this.editorHeight = this.height
      },
      width () {
        this.editorWidth = this.width
      }
    },
    destroyed () { // 销毁时清除定时器
      clearInterval(this.timerId)
    },
    components: {
      'el-dialog': Dialog,
      'el-button': Button,
      'el-upload': Upload
    }
  }
</script>

<style lang="less">
    @import "font/iconfont.css";
    @import "./css/theme";
    @import "css/light";
    @import "css/dark";
    @import "css/one-dark";
    @import "css/gitHub";
    @import "css/index";
    @import "~element-ui/lib/theme-chalk/dialog.css";
    @import "~element-ui/lib/theme-chalk/button.css";
</style>
