import { expect } from "chai";
import * as fs from 'fs';
import * as mkdirp from "mkdirp";
import * as cp from 'child_process';

// #region functions
const callGruntfile = (filename: string, whenDoneCallback: any): void => {
  let command: string;
  let options: any;
  command = "grunt --verbose --gruntfile " + filename + " --no-color";
  options = { cwd: 'test/' };
  cp.exec(command, options, whenDoneCallback);
}

const callNpmInstallAndGruntfile = (filename: string, whenDoneCallback: any): void => {
  let command: string;
  let options: any;
  command = "npm install";
  options = { cwd: 'test/' };
  cp.exec(command, {}, function (error: any, stdout: any, stderr: any) {
    callGruntfile(filename, whenDoneCallback);
  });
}

const contains = (where: any, what: string): boolean => {
  const index: number = where.toString().indexOf(what);
  return index > -1;
}

const containsWarning = (buffer: any, warning: string): boolean => {
  return contains(buffer, 'Warning: Plugin failed: ' + warning);
}
// #endregion
const outDir = `${process.cwd()}/scratch/test`;
const fixDir = `${process.cwd()}/test/fixtures`;
mkdirp.sync(`${outDir}/css`);

describe('Build include Plugin', function () {
  it('should write a simple file and replace the build_replace contents matching fixture simple_repalced.txt',
    function (done) {
      callGruntfile('gruntfile-simple.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        // if(error) {
        //   console.log(error);
        // }
        let src = fs.readFileSync(`${fixDir}/simple_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/simple_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should fail to write a file as a none existant file name is in the build_replace',
    function (done) {
      callGruntfile('gruntfile-badfile.js', function (error: any, stdout: any, stderr: any) {
        expect(error).to.not.be.null;
        expect(error.message).to.contain('Command failed');
        done();
      });
    });
  it('should overwrite file sample_inline.js and replace the build_replace contents matching fixture sample01_repalce1.js.\
 \n\tasjstring is set with breakstring. This will cause the replacement to do an escaped breakString replacement.\
 \n\tThis test using gruntfile-same.js',
    function (done) {
      callGruntfile('gruntfile-same.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/sample01_replaced01.js`);
        let dest = fs.readFileSync(`${outDir}/sample_inline.js`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a textOpt file and replace the build_replace contents matching fixture textOpt_repalced.txt\
  \n\tThis test uses gruntfile-textOpt.js',
    function (done) {
      callGruntfile('gruntfile-textOpt.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/textOpt_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/textOpt_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a asJsString_replaced.txt file and replace the build_replace contents matching fixture asJsString_replaced.txt\
  \n\tThis test uses gruntfile-asjsstring.js',
    function (done) {
      callGruntfile('gruntfile-asjsstring.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/asJsString_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/asJsString_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a recursive03_replaced.txt file and replace the build_replace contents matching fixture recursive03_replaced.txt\
\n\tThis is a multi-level recursion test several levels deep\
\n\tThis test uses gruntfile-recursive.js',
    function (done) {
      callGruntfile('gruntfile-recursive.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/recursive03_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/recursive03_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a commetsl01_replaced.txt file and replace the build_replace contents matching fixture commetsl01_replaced.txt\
  \n\tThis test uses gruntfile-commentsl.js',
    function (done) {
      callGruntfile('gruntfile-commentsl.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/commetsl01_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/commetsl01_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a commentHash_replaced.txt file and replace the build_replace contents matching fixture commentHash_replaced.txt\
  \n\tThis test uses gruntfile-commenthash.js',
    function (done) {
      callGruntfile('gruntfile-commenthash.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/commentHash_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/commentHash_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a simple_escape_replaced.txt file and replace the build_replace contents matching fixture simple_escape_replaced.txt\
  \n\tThis test many different escapes such as \\& \\= \\, \\n \\] \\[ and more\
  \n\tThis test uses gruntfile-escape.js',
    function (done) {
      callGruntfile('gruntfile-escape.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/simple_escape_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/simple_escape_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a simple_newline_replaced file and replace the build_replace contents matching fixture simple_newline_replaced.txt\
  \n\tThe regular expression looks for matches with a pattern of # build_include(./somefile.txt)\
  \n\t[options]\
  \n\tNOTE: the options are on a line below the initial build_include\
  \n\tThis test is to also check lf match\
  \n\tThis test uses gruntfile-newline.js',
    function (done) {
      callGruntfile('gruntfile-newline.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/simple_newline_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/simple_newline_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file and replace the build_replace contents matching fixture simple_newline_replaced_crlf.txt\
  \n\tThe regular expression looks for matches with a pattern of # build_include(./somefile.txt)\
  \n\t[options]\
  \n\tNOTE: the options are on a line below the initial build_include\
  \n\tThis test is to also check crlf match\
  \n\tThis test uses gruntfile-newline-crlf.js',
    function (done) {
      callGruntfile('gruntfile-newline-crlf.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/simple_newline_replaced_crlf.txt`);
        let dest = fs.readFileSync(`${outDir}/simple_newline_replaced_crlf.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using grunt kind option of buildIncludeSlash.\
  \n\tReplace the build_replace contents matching fixture textOpt_repalced.txt\
  \n\tThis test uses gruntfile-slash.js',
    function (done) {
      callGruntfile('gruntfile-slash.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/textOpt_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/textOpt_slash_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using grunt kind option of buildIncludeSlash.\
  \n\tIn this case the match will be set with a string value\
  \n\tReplace the build_replace contents matching fixture textOpt_repalced.txt\
  \n\tThis test uses gruntfile-slash-string.js',
    function (done) {
      callGruntfile('gruntfile-slash-string.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/textOpt_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/textOpt_slash_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using grunt kind option of buildIncludeSlash.\
  \n\tIn this case the match will be set with a numeric value\
  \n\tReplace the build_replace contents matching fixture textOpt_repalced.txt\
  \n\tThis test uses gruntfile-slash-num.js',
    function (done) {
      callGruntfile('gruntfile-slash-num.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/textOpt_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/textOpt_slash_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using grunt kind option of buildIncludePound.\
  \n\tReplace the build_replace contents matching fixture simple_regex_replaced.txt\
  \n\tThis test uses gruntfile-pound.js',
    function (done) {
      callGruntfile('gruntfile-pound.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/regex_simple_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/regex_simple_pound_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using grunt kind option of buildIncludeHtml.\
  \n\tReplace the build_replace contents matching fixture simple_html_replaced.txt\
  \n\tThis test uses gruntfile-html.js',
    function (done) {
      callGruntfile('gruntfile-html.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/simple_html_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/simple_html_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using grunt kind option of bracketInclude.\
  \n\tReplace the build_replace contents matching fixture includeBracket_replaced.txt\
  \n\tThis test uses gruntfile-bracketInclude.js',
    function (done) {
      callGruntfile('gruntfile-bracketInclude.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/includeBracket_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/includeBracket_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using grunt kind option of bracketIncludeMulti.\
  \n\tReplace the build_replace contents matching fixture includeBracket_replaced.txt\
  \n\tThis is a simulation of replacing inline includes for comments in format of [[include:somefile]]\
  \n\tThis test uses gruntfile-bracketIncludeMulti.js',
    function (done) {
      callGruntfile('gruntfile-bracketIncludeMulti.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/includeBracketMulti_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/includeBracketMulti_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using grunt kind option of bracketIncludeMulti.\
  \n\tReplace the build_replace contents matching fixture includeBracketFence_replaced.txt\
  \n\tThis is a simulation of replacing inline includes for comments in format of [[include:somefile]]\
  \n\tFence is in grunt file of type strict\
  \n\tThis test uses gruntfile-bracketIncludeFence.js',
    function (done) {
      callGruntfile('gruntfile-bracketIncludeFence.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/includeBracketFence_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/includeBracketFence_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using grunt fence option of strict.\
  \n\tReplace the build_replace contents matching fixture simple_fenced_replaced.txt\
  \n\tThis searches for fences ``` and omitts any formating from fenced text.\
  \n\tThis test uses gruntfile-fence-simple.js',
    function (done) {
      callGruntfile('gruntfile-fence-simple.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/simple_fenced_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/simple_fenced_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using inline fence options.\
  \n\tReplace the build_replace contents matching fixture simple_fenced_replaced.txt\
  \n\tThis searches for fences ``` and omitts any formating from fenced text.\
  \n\tThis test uses gruntfile-fence-inline.js',
    function (done) {
      callGruntfile('gruntfile-fence-inline.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/fenced_inline_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/fenced_inline_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using fence multiflex options.\
  \n\tAlso Test text whiteSpaceLine options.\
  \n\tReplace the build_replace contents matching fixture fence_multi_replaced.txt\
  \n\tThis searches for various fences and applies settings based on inline build_include options\
  \n\tThis test uses gruntfile-fence-multi.js',
    function (done) {
      callGruntfile('gruntfile-fence-multi.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/fence_multi_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/fence_multi_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using gruntfile breakstring, asJsString and override\
  \n\tOverrides the value set for breakstring in fixtures/asJsString.txt\
  \n\tReplace the build_replace contents matching fixture gruntfile_asjsstring_replaced.txt\
  \n\tThis test uses gruntfile-breakstring_asjs_ov.js',
    function (done) {
      callGruntfile('gruntfile-breakstring_asjs_ov.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/gruntfile_asjsstring_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/gruntfile_asjsstring_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
  it('should write a file using gruntfile breakstring option set to number.\
  \n\tReplace the build_replace contents matching fixture gruntfile_breakstring_style.txt\
  \n\tThis test uses gruntfile-breakstring100.js',
    function (done) {
      callGruntfile('gruntfile-breakstring100.js', function (error: any, stdout: any, stderr: any) {
        expect(stdout).to.not.be.null;
        // console.log(stdout);
        expect(error).to.be.null;
        let src = fs.readFileSync(`${fixDir}/gruntfile_breakstring100_replaced.txt`);
        let dest = fs.readFileSync(`${outDir}/gruntfile_breakstring100_replaced.txt`);
        expect(src.equals(dest)).equal(true);
        done();
      });
    });
});