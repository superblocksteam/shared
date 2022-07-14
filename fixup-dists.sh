# Ensure that each of the dist folders is tagged correctly
# https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html

cat >dist/package.json <<!EOF
{
  "type": "commonjs"
}
!EOF

cat >dist-esm/package.json <<!EOF
{
  "type": "module",
  "sideEffects": false
}
!EOF