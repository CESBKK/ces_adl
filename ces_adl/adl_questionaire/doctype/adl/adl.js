// Copyright (c) 2025, Cloud Engineering and Services Company Limited and contributors
// For license information, please see license.txt

frappe.ui.form.on('ADL', {
    setup(frm){
        setup_queationaire(frm);
    },
    refresh(frm){
        make_radio_button(frm);
    },
    validate(frm){
        frm.question_list.every((item) => {
            if (item.value === null || item.value === '') {
                frappe.msgprint({
                    title: __('Validation Error'),
                    message: __('Please answer all questions.'),
                    indicator: 'orange'
                });
                frappe.validated = false;
                return false;
            }
            return true;
        });
    }
});

setup_queationaire = (frm) => {
    frm.q01 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(1) รับประทานอาหารเมื่อเตรียมสํารับไว้ให้เรียบร้อยต่อหน้า',
            fieldname: 'q01',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ไม่สามารถตักอาหารเข้าปากได้',
                '1 ตักอาหารเองได้ แต่ต้องมีคนช่วย เช่น ช่วยใช้ช้อนตักเตรียมไห้/ตัดเป็นชิ้นเล็กๆให้',
                '2 ตักอาหารและช่วยตัวเองได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q02 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(2) การล้างหน้า หวีผม แปรงฟัน โกนหนวดในระยะเวลา 24–48 ชั่วโมงที่ผ่านมา',
            fieldname: 'q02',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ต้องการความช่วยเหลือ',
                '1 ทําได้เอง (รวมทั้งที่ทําได้เองถ้าเตรียมอุปกรณ์ไว้ให้)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q03 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(3) ลุกนั่งจากที่นอน หรือจากเตียงไปยังเก้าอี้',
            fieldname: 'q03',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ไม่สามารถนั่งได้ (นั่งแล้วจะล้มเสมอ) หรือต้องใช้คน 2 คนช่วยกันยกขึ้น',
                '1 ต้องใช้คนแข็งแรงหรือมีทักษะ 1 คน/ใช้คนทั่วไป 2 คนพยุงดันขึ้นมาจึงจะนั่งอยู่ได้',
                '2 ต้องการความช่วยเหลือบ้าง เช่นช่วยพยุงเล็กน้อย/ต้องมีคนดูแลเพื่อความปลอดภัย',
                '3 ทําได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q04 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(4) การใช้ห้องน้ำ',
            fieldname: 'q04',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ช่วยตัวเองไม่ได้',
                '1 ทําเองได้บ้าง ต้องการความช่วยเหลือในบางสิ่ง',
                '2 ช่วยเหลือตัวเองได้ดี'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q05 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(5) การเคลื่อนที่ภายในห้องหรือบ้าน',
            fieldname: 'q05',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 เคลื่อนที่ไปไหนไม่ได้',
                '1 ใช้รถเข็นช่วยให้เคลื่อนที่ได้เอง (ไม่ต้องมีคนเข็นให้) เข้าออกมุมห้องหรือประตูได้',
                '2 เดินหรือเคลื่อนที่โดยมีคนช่วย เช่น พยุง',
                '3 เดินหรือเคลื่อนที่ได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q06 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(6) การสวมใส่เสื้อผ้า',
            fieldname: 'q06',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ต้องมีคนสวมใส่ให้ ช่วยตัวเองแทบไม่ได้หรือได้น้อย',
                '1 ช่วยตัวเองได้ประมาณร้อยละ 50 ที่เหลือต้องมีคนช่วย',
                '2 ช่วยตัวเองได้ดี (รวมทั้งการติดกระดุม รูดซิป ใส่เสื้อผ้าที่ดัดแปลงให้เหมาะสมก็ได้)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q07 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(7) การขึ้นลงบันได 1 ชั้น',
            fieldname: 'q07',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ไม่สามารถทําได้',
                '1 ต้องการคนช่วย',
                '2 ขึ้นลงได้เอง (ถ้าต้องใช้เครื่องช่วยเดิน เช่น Walker จะต้องเอาขึ้นลงได้ด้วย)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q08 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(8) การอาบน้ำ',
            fieldname: 'q08',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ต้องมีคนช่วยหรือทําให้',
                '1 อาบน้ำได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q09 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(9) การกลั้นการถ่ายอุจจาระ ใน 1 สัปดาห์ที่ผ่านมา',
            fieldname: 'q09',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 กลั้นไม่ได้ หรือต้องการการสวนอุจจาระอยู่เสมอ',
                '1 กลั้นไม่ได้บางครั้ง (ไม่เกิน 1 ครั้งต่อสัปดาห์)',
                '2 กลั้นได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q10 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(10) การกลั้นปัสสาวะในระยะ 1 สัปดาห์ที่ผ่านมา',
            fieldname: 'q10',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 กลั้นไม่ได้ หรือใส่สายสวนปัสสาวะ แต่ไม่สามารถดูแลเองได้',
                '1 กลั้นไม่ได้บางครั้ง (ไม่เกินวันละ 1 ครั้ง)',
                '2 กลั้นได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    
    frm.question_list = [frm.q01, frm.q02, frm.q03, frm.q04, frm.q05, frm.q06, frm.q07, frm.q08, frm.q09, frm.q10];
    // $('[data-fieldname="questionaire_data"]').hide();
    sync_quetionaire_json(frm);
}

on_questionaire_change = (frm) => {
    let jsonData = {};
    let totalScore = 0;
    frm.question_list.forEach((item) => {
        if (item.value === null || item.value === '') {
            jsonData[item.df.fieldname] = '';
        }
        else {
            jsonData[item.df.fieldname] = parseInt(item.value.split(' ')[0]);
            totalScore += jsonData[item.df.fieldname];
        }
    });
    jsonData['total'] = totalScore;
    // jsonData = JSON.stringify(jsonData, null, 4);
    jsonData = JSON.stringify(jsonData);
    frm.set_value('questionaire_data', jsonData);
    frm.dirty();
}

sync_quetionaire_json = (frm) => {
    let jsonData = frm.doc.questionaire_data;
    
    // For Debuging
    // jsonData = '{"q01":"","q02":1,"q03":3,"q04":2,"q05":1,"q06":1,"q07":1,"q08":1,"q09":1,"q10":1, "total":9}'
    jsonData = JSON.parse(jsonData);
    
    frm.question_list.forEach((item) => {
        item_index = jsonData[item.df.fieldname];
        item_index = item_index === '' ? 0 : item_index+1;
        item.set_value(item.df.options[item_index]);
    });
}

make_radio_button = (frm) => {
    /*
    Display drop-down menu in radio button format.
    Frappe 15 does not have radio button. We will need to use this procedures if we need radio button.
    Drop down still exist but we hide it.
    https://stackoverflow.com/questions/3974217/convert-dropdowns-to-radio-buttons-w-o-modifying-html
    */
    frm.question_list.forEach((item) => {
        $('[data-fieldname="' + item.df.fieldname + '"][placeholder]').each((selectIndex, selectElement) => {
            let select = $(selectElement);
            let container = $('<div class="radioSelectContainer" />');
            select.hide();
            $('.select-icon').hide();
            select.after(container);
            container.append(select);

            select.find('option').each(function (optionIndex, optionElement) { // get the options
                let radioGroup = item.df.fieldname + 'Group';
                let label = $('<label />');
                container.append(label);
                
                if ($(this).val() !== '') {
                    // <input type="radio" name="q01Group" value="1 ตักอาหารเองได้">
                    $('<input type="radio" name="' + radioGroup + '" />') // create a radio element
                        .attr('value', $(this).val()) // set the value
                        .click((() => {
                            select.val($(this).val()); //radio updates select - see optional below
                            select.trigger('change');
                        }))
                        .appendTo(label);
                    $('<span>' + $(this).val() + '</span>').appendTo(label);
                }
            });

            container.find(':radio + span').mousedown(
                function(e) {
                    let $span = $(this);
                    let $radio = $span.prev();
                    if ($radio.is(':checked')) {
                        let uncheck = function() {
                            setTimeout(function () { 
                                $radio.prop('checked', false);
                                select.val(null); //set value to null when unchecked.
                                select.trigger('change');
                            }, 0);
                        };
                        let unbind = function() {
                            $span.unbind('mouseup', up);
                        };
                        let up = function() {
                            uncheck();
                            unbind();
                        };
                        $span.bind('mouseup', up);
                        $span.one('mouseout', unbind);
                    } else {
                        select.val($radio.val());
                    }
                }
            );

            select.change((() => { //select updates radio
                $('input[name="' + item.df.fieldname + 'Group' + '"][value="' + this.value + '"]').prop('checked', true);
            }));
        });
    });
}
