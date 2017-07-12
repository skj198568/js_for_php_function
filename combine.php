<?php
/**
 * Created by PhpStorm.
 * User: SongKejing
 * QQ: 597481334
 * Date: 2017/7/12
 * Time: 16:03
 */

/**
 * 获取当前文件夹下面所有的文件夹
 * @param $dir
 * @return array
 */
function dir_get($dir)
{
    $dir = trim($dir, DIRECTORY_SEPARATOR);
    $data = array();
    if (is_dir($dir)) {
        $dp = dir($dir);
        while ($file = $dp->read()) {
            if ($file != '.' && $file != '..') {
                if (is_dir($dir . DIRECTORY_SEPARATOR . $file)) {
                    $data[] = $dir . DIRECTORY_SEPARATOR . $file;
                }
            }
        }
    }
    return $data;
}

/**
 * 获取文件夹下面的所有文件
 * @param $dir 文件夹目录绝对地址
 * @param array $file_types :文件类型array('pdf', 'doc')
 * @param array $ignore_dir_or_file : 忽略的文件或文件夹
 * @return array
 */
function dir_get_files($dir, $file_types = array(), $ignore_dir_or_file = [])
{
    foreach (['.', '..'] as $each) {
        if (!in_array($each, $ignore_dir_or_file)) {
            $ignore_dir_or_file[] = $each;
        }
    }
    $dir = trim($dir, DIRECTORY_SEPARATOR);
    $data = array();
    if (is_dir($dir)) {
        $files = scandir($dir);
        foreach ($files as $file) {
            if (in_array($file, $ignore_dir_or_file)) {
                continue;
            }
            if (is_dir($dir . DIRECTORY_SEPARATOR . $file)) {
                $data = array_merge($data, dir_get_files($dir . DIRECTORY_SEPARATOR . $file, $file_types, $ignore_dir_or_file));
            } else {
                if (empty($file_types)) {
                    $data[] = $dir . DIRECTORY_SEPARATOR . $file;
                } else {
                    //判断类型
                    if (in_array(get_suffix($file), $file_types)) {
                        $data[] = $dir . DIRECTORY_SEPARATOR . $file;
                    }
                }
            }
        }
    } else if (is_file($dir)) {
        if (empty($file_types)) {
            if (!in_array($dir, $ignore_dir_or_file)) {
                $data[] = $dir;
            }
        } else {
            //判断类型
            if (in_array(get_suffix($dir), $file_types) && !in_array($dir, $ignore_dir_or_file)) {
                $data[] = $dir;
            }
        }
    }
    return $data;
}

/**
 * 获取文件后缀名
 * @param $file
 * @return mixed
 */
function get_suffix($file)
{
    return isset(pathinfo($file)['extension']) ? strtolower(pathinfo($file)['extension']) : '';
}

/**
 * 仅替换一次
 * @param $search
 * @param $replace
 * @param $string
 * @return mixed
 */
function replace_once($search, $replace, $string)
{
    $pos = strpos($string, $search);
    if ($pos === false) {
        return $string;
    }
    return substr_replace($string, $replace, $pos, strlen($search));
}

define('CURRENT_DIR', __DIR__.DIRECTORY_SEPARATOR);

//保存的文件
$file = sprintf('%sphp_%s.js', CURRENT_DIR, date('Y_m_d_H_i_s'));
$all_content = '';
$md = '# js_for_php_function
js实现php函数库，方便php开发人员快速在js业务中快速使用已经熟悉的php函数库。 
使用方式，直接引入
```
<script src="php.min.js"></script>
<script type="text/javascript">
    console.log(php.array_flip(
        {a: 1, b: 1, c: 2}
    ));
</script>
```
已经实现的函数库如下：
';
foreach(dir_get(CURRENT_DIR) as $each_dir){
    $md .= sprintf("## %s\n", pathinfo($each_dir)['filename']);
    $js_files = dir_get_files($each_dir, ['js']);
    foreach($js_files as $each_file){
        $md .= sprintf("[%s](http://php.net/manual/zh/function.%s.php)  \n", pathinfo($each_file)['filename'], pathinfo($each_file)['filename']);
        $content = file_get_contents($each_file);
        $content = replace_once('function', '', $content);
        $content = replace_once('(', ': function(', $content);
        if(empty($all_content)){
            $all_content = $content;
        }else{
            $all_content .= ','.$content;
        }
    }
}
//文件内容
file_put_contents($file, sprintf('php = {
%s
};', $all_content));
//md
file_put_contents(sprintf('%sREADME.md', CURRENT_DIR), $md);
