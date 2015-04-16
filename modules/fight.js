/**
 * Created by Andrey on 16.04.2015.
 */

var unitDistance = function (ob){
    var newX = ob.x - this.x;
    var newY = ob.y - this.y;
    return Math.sqrt((newX*newX)+(newY*newY));
};

var fight = function (target) {
    if (this.health === 0) {return  "Sorry, but you're dead"}
    if (target.health === 0) {return  'You can`t strike your enemy, because he is already dead'}
    //if (this.isEnemy === target.isEnemy) {return  'Not enemy'}    //���� ������ ������������ �� ���� � ������

    var range = this.range;
    var howFar = unitDistance.call(this,target);  //������� �� ����������
    var HP = target.health;
    var atEvas = target.atEvas ? target.atEvas : 0.1;  //���� ���������
    var damage = this.power;
    var atCrtChns = this.atCrtChns ? this.atCrtChns : 0.3;  //���� ����
    var atCrtPow = this.atCrtPow ? this.atCrtPow : 0.8;  //���� ����

    if (howFar <= range){
        damage = (Math.random() <= atCrtChns ? damage + damage * atCrtPow : damage);  //������������� ���
        damage = damage * (Math.random() <= atEvas ? 0 : 1);  //������������� ������
        HP = (HP - damage) > 0 ? (HP - damage).toFixed(2) : 0;
        target.health = HP;
        return this.name+' baxnyv '+damage+' to '+target.name+', his HP= '+ HP;
    }else{

        /* ���� �������, �� �������� �������� ��  */

        this.moveTo(target.x,target.y);
        var distin = howFar - unitDistance.call(this,target);  //�������� �������
        howFar = howFar - distin;

        if (howFar <= range) {                                      //���� ���� ����� � ������
            atEvas = (howFar < 0.1) ? atEvas*0.6 : atEvas*1.6;
            damage = (howFar < 0.1) ? damage*1.2 : damage*0.8;
            damage = (Math.random() <= atCrtChns ? damage + damage * atCrtPow : damage);
            damage = damage * (Math.random() <= atEvas ? 0 : 1);
            HP = (HP - damage) > 0 ? (HP - damage).toFixed(2) : 0;
            target.health = HP;
            return this.name+' baxnyv z rozbega '+damage+' to '+target.name+', his HP= '+ HP;
        }else{
            return 'You are too far from the target to strike';
        }
    }
}

module.exports = fight;